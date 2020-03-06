/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    angular.module("siemens.simaticit.common.widgets.flowEditor", []);
}());



(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.Actions", ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            function ($log, FlowConstants, SVGSelectorService) {

                var removeCell = function (cells, cell) {
                    var index = cells.indexOf(cell);
                    if (index > -1) {
                        cells.splice(index, 1);
                    }
                };

                var moveOnTop = function (graphService, list) {
                    for (var i = 0; i < list.length; i++) {
                        var cell = list[i];
                        SVGSelectorService.MoveOnTop(cell, graphService.MainCanvas);
                    }
                };

                var ConnectAndCloneAction = function (graphService, source, targetPrototype, edgePrototype, direction) {
                    var edge;
                    var target;
                    this.Name = "ConnectAndClone Action";

                    this.Execute = function () {
                        if (edge == null) {
                            edge = new edgePrototype();
                            edge.Id = window.$UIF.Utility.uuid();
                        }

                        if (target == null) {
                            target = new targetPrototype();
                            target.Incoming = new Array();
                            target.Outgoing = new Array();

                            if (direction === "right") {
                                target.X = source.X + source.Width + 100;
                                target.Y = source.Y;
                            } else if (direction === "bottom") {
                                target.X = source.X;
                                target.Y = source.Y + source.Height + 100;
                            } else if (direction === "left") {
                                target.X = source.X - source.Width - 100;
                                target.Y = source.Y;
                            } else if (direction === "top") {
                                target.X = source.X;
                                target.Y = source.Y - source.Height - 100;
                            }
                            target.Width = source.Width;
                            target.Height = source.Height;
                            target.Background = source.Background;
                            target.Foreground = source.Foreground;
                            target.Label = source.Label;
                            target.Id = window.$UIF.Utility.uuid();
                        }
                        graphService.AddCell(target);
                        graphService.AddEdge(edge, source, target);
                    };
                    this.UnExecute = function () {
                        graphService.RemoveEdge(edge);
                        graphService.RemoveVertex(target);

                        if (edge.OnRemove != null) {
                            return edge.OnRemove();
                        }
                        if (target.OnRemove != null) {
                            return target.OnRemove();
                        }
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };


                var CreateEdgeAction = function (graphService, source, target, edgePrototype) {
                    var edge;
                    this.Name = "Create Edge Action";

                    this.Execute = function () {
                        if (edge == null) {
                            edge = typeof edgePrototype === 'function' ? new edgePrototype() : edgePrototype;
                            edge.Id = window.$UIF.Utility.uuid();
                        }
                        graphService.AddEdge(edge, source, target);
                    };
                    this.UnExecute = function () {
                        graphService.RemoveEdge(edge);

                        if (edge.OnRemove != null) {
                            return edge.OnRemove();
                        }
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                //---  FMA  ----------------------------------------------------------
                var MoveGroupVertexAction = function (graphService, vertexes, dx, dy) {
                    var i;
                    this.Name = "Move Group Vertex Action";
                    this.Execute = function () {
                        angular.forEach(vertexes, function (v) {
                            v.X += dx + FlowConstants.innerPlaceholderGap;
                            v.Y += dy + FlowConstants.innerPlaceholderGap;
                            var parent = SVGSelectorService.GetCandidateParentFromCell(graphService, v);
                            graphService.UpdateVertex(v, parent);
                        });
                    };
                    this.UnExecute = function () {
                        angular.forEach(vertexes, function (v) {
                            v.X -= dx + FlowConstants.innerPlaceholderGap;
                            v.Y -= dy + FlowConstants.innerPlaceholderGap;
                            var parent = SVGSelectorService.GetCandidateParentFromCell(graphService, v);
                            graphService.UpdateVertex(v, parent);
                        });
                    };
                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };
                }
                //---------------------------------------------------------------------------

                var MoveVertexAction = function (graphService, startX, startY, endX, endY, vertex, parent, children) {
                    this.Name = "Move Vertex Action";

                    var oParent;
                    var childrenOffset = [];
                    var registerOffset = function (cell, list) {
                        for (var i = 0; i < list.length; i++) {
                            var child = list[i];
                            childrenOffset[child.Id] = { ox: child.X - cell.X, oy: child.Y - cell.Y };
                            if (child.CanHaveChildren)
                                registerOffset(cell, child.Children);
                        }
                    };

                    var updateChildren = function (cell, list) {
                        for (var i = 0; i < list.length; i++) {
                            var child = list[i];
                            var coff = childrenOffset[child.Id];
                            child.X = cell.X + coff.ox;
                            child.Y = cell.Y + coff.oy;
                            if (child.CanHaveChildren)
                                updateChildren(cell, child.Children);
                        }
                    };

                    if (vertex.CanHaveChildren)
                        registerOffset(vertex, vertex.Children);

                    this.Execute = function () {
                        oParent = vertex.Parent;

                        if (startX != endX || startY != endY) {
                            vertex.X = endX + FlowConstants.innerPlaceholderGap;
                            vertex.Y = endY + FlowConstants.innerPlaceholderGap;
                        }

                        if (vertex.CanHaveChildren)
                            updateChildren(vertex, vertex.Children);

                        if (children) {
                            for (var i = 0; i < children.length; i++) {

                                if (children[i].Parent == null) { // se il parent è null gli assegno il vertex come parent
                                    vertex.Children.push(children[i]);
                                    children[i].Parent = vertex;
                                    //togliamo dal graphservice il vertex perchè non deve più stare a livello 0 ma solo sotto al parent
                                    var index = graphService.Cells.indexOf(children[i]);
                                    if (index > -1) {
                                        graphService.Cells.splice(index, 1);
                                    }
                                }
                                else { //altrimenti vado a a controllare se il parent è già presente tra i children del vertex
                                    var alreadyExistingParent = vertex.Children.filter(function (child) { return child.Id == children[i].Parent.Id; })[0];
                                    if (alreadyExistingParent == null) {
                                        //tolgo il children dal vecchio parent
                                        var indexC = children[i].Parent.Children.indexOf(children[i]);
                                        if (indexC > -1)
                                            children[i].Parent.Children.splice(indexC, 1);

                                        // assegno al vertex il nuovo child
                                        vertex.Children.push(children[i]);
                                        children[i].Parent = vertex;
                                    }
                                }

                                SVGSelectorService.MoveOnTop(children[i], graphService.MainCanvas);
                                if (children[i].CanHaveChildren && children[i].Children)
                                    moveOnTop(graphService, children[i].Children);
                            }
                        }

                        //decomment
                        // resetting routes
                        //for (var i = 0; i < vertex.Outgoing.length; i++) {
                        //    var edge = vertex.Outgoing[i];
                        //    edge.ResetRoute();
                        //}
                        //for (var i = 0; i < vertex.Incoming.length; i++) {
                        //    var edge = vertex.Incoming[i];
                        //    edge.ResetRoute();
                        //}

                        if (vertex.CheckError)
                            vertex.CheckError(function () { graphService.UpdateVertex(vertex, parent); }, { parent: parent, oparent: oParent });
                        else
                            graphService.UpdateVertex(vertex, parent);

                    };

                    this.UnExecute = function () {

                        vertex.X = startX;
                        vertex.Y = startY;

                        if (children) {
                            for (var i = 0; i < children.length; i++) {
                                if (children[i].Parent.Id === vertex.Id) {
                                    children[i].Parent = null;
                                    var index = vertex.Children.indexOf(children[i]);
                                    vertex.Children.splice(index, 1);
                                    // se nel graph service non c'è la cella la aggiungo
                                    var graphIndex = graphService.Cells.indexOf(children[i]);
                                    if (graphIndex === -1) {
                                        graphService.Cells.push(children[i]);
                                    }
                                }
                            }
                        }

                        if (vertex.CanHaveChildren)
                            updateChildren(vertex, vertex.Children);



                        if (vertex.CheckError)
                            vertex.CheckError(function () { graphService.UpdateVertex(vertex, oParent); }, { parent: oParent });
                        else
                            graphService.UpdateVertex(vertex, oParent);
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                var ResizeVertexAction = function (graphService, sW, sH, tW, tH, vertex) {

                    this.Name = "Resize Vertex Action";

                    this.Execute = function () {
                        vertex.Width = tW;
                        vertex.Height = tH;
                        graphService.UpdateVertex(vertex, vertex.Parent);


                    };
                    this.UnExecute = function () {
                        vertex.Width = sW;
                        vertex.Height = sH;
                        graphService.UpdateVertex(vertex, vertex.Parent);
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                //---  FMA shortcut US8034 -----------------------------------
                var CopyVertexAction = function (graphService, vertex) {
                    this.Name = "Copy Vertex Action";
                    this.Execute = function () {
                        graphService.AddCell(vertex, null);
                    };
                    this.UnExecute = function () {
                        graphService.RemoveCell(vertex);
                        if (vertex.OnRemove != null) {
                            return vertex.OnRemove();
                        }
                    };
                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };
                };
                //-----------------------------------------------------------------------

                var AddVertexAction = function (graphService, x, y, proto, parent, children) {
                    var vertex;
                    this.Name = "Add Vertex Action";

                    this.Execute = function () {
                        if (vertex == null) {
                            vertex = typeof proto === 'function' ? new proto() : proto;

                            x = x - vertex.Width / 2;
                            y = y - vertex.Height / 2;

                            vertex.Incoming = [];
                            vertex.Outgoing = [];
                            if (vertex.CanHaveChildren)
                                vertex.Children = [];


                            vertex.X = x;
                            vertex.Y = y;
                            vertex.Id = window.$UIF.Utility.uuid();
                        }

                        graphService.AddCell(vertex, parent);
                        if (children) {
                            for (var i = 0; i < children.length; i++) {

                                if (children[i].Parent == null) {
                                    children[i].Parent = vertex;
                                    vertex.Children.push(children[i]);
                                    //togliamo dal graphservice il vertex perchè non deve più stare a livello 0 ma solo sotto al parent
                                    var index = graphService.Cells.indexOf(children[i]);
                                    if (index > -1) {
                                        graphService.Cells.splice(index, 1);
                                    }
                                }
                                else {
                                    //altrimenti vado a a controllare se il parent è già presente gli altri children che sto incorporando
                                    var alreadyExistingParent = children.filter(function (child) { return child.Id === children[i].Parent.Id; })[0];
                                    if (alreadyExistingParent == null) {
                                        //tolgo il children dal vecchio parent
                                        var indexC = children[i].Parent.Children.indexOf(children[i]);
                                        if (indexC > -1)
                                            children[i].Parent.Children.splice(indexC, 1);

                                        // assegno al vertex il nuovo child
                                        vertex.Children.push(children[i]);
                                        children[i].Parent = vertex;
                                    }
                                }
                                SVGSelectorService.MoveOnTop(children[i], graphService.MainCanvas);
                                if (children[i].CanHaveChildren && children[i].Children)
                                    moveOnTop(graphService, children[i].Children);
                            }

                        }

                    };
                    this.UnExecute = function () {
                        if (children) {
                            for (var i = 0; i < children.length; i++) {
                                if (children[i].Parent.Id === vertex.Id) {
                                    children[i].Parent = null;
                                    var index = vertex.Children.indexOf(children[i]);
                                    vertex.Children.splice(index, 1);
                                    // se nel graph service non c'è la cella la aggiungo
                                    var graphIndex = graphService.Cells.indexOf(children[i]);
                                    /* eslint-disable */
                                    if (graphIndex = -1) {
                                        graphService.Cells.push(children[i]);
                                    }
                                    /* eslint-enable */
                                }
                            }
                        }
                        graphService.RemoveCell(vertex);

                        if (vertex.OnRemove != null) {
                            return vertex.OnRemove();
                        }
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                //removeEdgesFlag is IN for removing incoming edges
                // removeEdgesFlag is OUT for outgoing edges
                // removeEdgesFlag undefined for none
                var TransformVertexAction = function (graphService, vertex, proto, removeEdgesFlag) {
                    this.Name = "Vertex Transform";
                    var oldVertex = vertex;

                    var affectedCells = [];

                    graphService.Cells.forEach(function (item) {
                        var cellBO = item.BusinessObject;
                        if (cellBO && cellBO.Variables && cellBO.Variables.length) {
                            if (_.find(item.BusinessObject.Variables, function (val) {
                                return (val.Source && val.Source.startsWith(vertex.NId)) || (val.Target && val.Target.startsWith(vertex.NId))
                            })) {
                                affectedCells.push(angular.copy(item));
                            }
                        } else if (item.Group === 'Gateways') {
                            for (var i = 0; i < item.Outgoing.length; i++) {
                                affectedCells.push(angular.copy(item.Outgoing[i]));
                            }
                        } else if (cellBO && cellBO.Timer && ((cellBO.Timer.Source && cellBO.Timer.Source.startsWith(vertex.NId))
                            || (cellBO.Timer.Target && cellBO.Timer.Target.startsWith(vertex.NId)))) {
                            affectedCells.push(angular.copy(item));
                        }
                    });

                    var inEdges = angular.copy(vertex.Incoming);
                    var outEdges = angular.copy(vertex.Outgoing);
                    this.Execute = function () {
                        if (vertex !== undefined) {
                            vertex = typeof proto === 'function' ? new proto() : proto;

                            vertex.Incoming = oldVertex.Incoming;
                            vertex.Outgoing = oldVertex.Outgoing;

                            vertex.X = oldVertex.X;
                            vertex.Y = oldVertex.Y;
                            vertex.Id = oldVertex.Id;
                            vertex.IsSelected = false;
                            var index = _.findIndex(graphService.Cells, function (item) { return vertex.Id === item.Id });

                            if (index !== -1) {
                                if (removeEdgesFlag === 'IN') {
                                    while (vertex.Incoming.length) {
                                        graphService.RemoveEdge(vertex.Incoming[0]);
                                    }
                                }
                                if (removeEdgesFlag === 'OUT') {
                                    while (vertex.Outgoing.length) {
                                        graphService.RemoveEdge(vertex.Outgoing[0]);
                                    }
                                }
                                graphService.Cells[index] = vertex;

                                vertex.Incoming.forEach(function (item) {
                                    item.Target = vertex;
                                });

                                vertex.Outgoing.forEach(function (item) {
                                    item.Source = vertex;
                                });

                                graphService.UpdateCell(vertex);
                                // remove
                                for (var i = 0; i < affectedCells.length; i++) {
                                    var cell = _.find(graphService.Cells, function (item) { return item.Id === affectedCells[i].Id });
                                    if (cell && cell.BusinessObject && cell.BusinessObject.Variables && cell.BusinessObject.Variables.length) {
                                        for (var j = cell.BusinessObject.Variables.length - 1; j >= 0; j--) {
                                            var val = cell.BusinessObject.Variables[j];
                                            if ((val.Source && val.Source.startsWith(vertex.NId))) {
                                                delete cell.BusinessObject.Variables[j].Source;
                                                cell.BusinessObject.Variables[j].Constant = true;
                                                cell.BusinessObject.Variables[j].Expression = true;
                                            }
                                            if ((val.Target && val.Target.startsWith(vertex.NId))) {
                                                delete cell.BusinessObject.Variables[j].Target;
                                                cell.BusinessObject.Variables[j].Constant = true;
                                                cell.BusinessObject.Variables[j].Expression = true;
                                            }
                                        }
                                    }
                                    if (cell && cell.BusinessObject && cell.BusinessObject.Timer) {
                                        var timerObj = cell.BusinessObject.Timer;
                                        if ((timerObj.Source && timerObj.Source.startsWith(vertex.NId)) || (timerObj.Target && timerObj.Target.startsWith(vertex.NId))) {
                                            delete cell.BusinessObject.Timer;
                                        }
                                    }
                                }
                                vertex = {};
                            }
                        }
                    };

                    this.UnExecute = function () {
                        if (oldVertex !== undefined) {
                            var index = _.findIndex(graphService.Cells, function (item) { return item.Id === oldVertex.Id });
                            if (index !== -1) {
                                oldVertex.IsSelected = false;
                                graphService.Cells[index] = oldVertex;

                                if (removeEdgesFlag === 'IN') {
                                    inEdges.forEach(function (item) {
                                        graphService.AddEdge(item, _.find(graphService.Cells, function (cell) { return cell.Id === item.Source.Id; }),
                                            _.find(graphService.Cells, function (cell) { return cell.Id === item.Target.Id; }));
                                    });
                                }
                                if (removeEdgesFlag === 'OUT') {
                                    outEdges.forEach(function (item) {
                                        graphService.AddEdge(item, _.find(graphService.Cells, function (cell) { return cell.Id === item.Source.Id; }),
                                            _.find(graphService.Cells, function (cell) { return cell.Id === item.Target.Id; }));
                                    });
                                }
                                oldVertex.Incoming.forEach(function (item) {
                                    item.Target = oldVertex;
                                });

                                oldVertex.Outgoing.forEach(function (item) {
                                    item.Source = oldVertex;
                                });
                                graphService.UpdateCell(oldVertex);
                            }

                            for (var i = 0; i < affectedCells.length; i++) {
                                var cell = _.find(graphService.Cells, function (item) { return item.Id === affectedCells[i].Id });
                                if (cell && cell.BusinessObject && cell.BusinessObject.Variables) {
                                    cell.BusinessObject.Variables = angular.copy(affectedCells[i].BusinessObject.Variables);
                                } else if (cell && cell.BusinessObject && cell.Type === 'timer') {
                                    cell.BusinessObject.Timer = angular.copy(affectedCells[i].BusinessObject.Timer);
                                }
                            }

                            for (i = 0; i < affectedCells.length; i++) {
                                cell = _.find(graphService.Cells, function (item) { return item.Id === affectedCells[i].Id });
                                if (cell) {
                                    cell.BusinessObject.Condition = angular.copy(affectedCells[i].BusinessObject.Condition);
                                }
                            }

                        }
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };

                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };
                }
                var RemoveVertexAction = function (graphService, vertex) {

                    this.Name = "Remove Vertex Action";

                    var incoming = vertex.Incoming;
                    var outgoing = vertex.Outgoing;
                    var parent;

                    this.Execute = function () {
                        parent = vertex.Parent;
                        graphService.RemoveVertex(vertex);

                        if (vertex.OnRemove != null) {
                            return vertex.OnRemove();
                        }
                    };
                    this.UnExecute = function () {
                        var e, i;
                        graphService.StartSession();

                        graphService.AddCell(vertex, parent, true);

                        for (i = 0; i < incoming.length; i++) {
                            e = incoming[i];
                            if (_.find(e.Source.Outgoing, function (edge) { return edge.Id === e.Id }) === undefined) {
                                e.Source.Outgoing.push(e);
                                graphService.AddCell(e, null, true);
                            }
                        }

                        for (i = 0; i < outgoing.length; i++) {
                            e = outgoing[i];
                            if (_.find(e.Source.Incoming, function (edge) { return edge.Id === e.Id }) === undefined) {
                                e.Target.Incoming.push(e);
                                graphService.AddCell(e, null, true);
                            }
                        }

                        graphService.EndSession();
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                var RemoveEdgeAction = function (graphService, edge) {
                    this.Name = "Remove Edge Action";

                    this.Execute = function () {
                        graphService.RemoveEdge(edge);

                        if (edge.OnRemove != null) {
                            return edge.OnRemove();
                        }

                    };
                    this.UnExecute = function () {
                        graphService.AddEdge(edge, edge.Source, edge.Target);
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                var EditEdgeWayPointAction = function (graphService, cell, oldPoints, oldSourcePos, oldTargetPos) {
                    var newPoints = angular.copy(cell.Points);
                    var newSourcePos = cell.SourcePos;
                    var newTargetPos = cell.TargetPos;
                    this.Name = "Edit Edge WayPoint Action";

                    this.Execute = function () {
                        cell.Points = angular.copy(newPoints)
                        cell.SourcePos = newSourcePos;
                        cell.TargetPos = newTargetPos;
                        graphService.UpdateCell(cell);
                    };
                    this.UnExecute = function () {
                        cell.Points = angular.copy(oldPoints);
                        cell.SourcePos = oldSourcePos;
                        cell.TargetPos = oldTargetPos;
                        graphService.UpdateCell(cell);
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };
                };

                var RenameCellAction = function (graphService, cell, oldName) {
                    var newName = cell.Label;
                    this.Name = "Rename Cell Action";

                    this.Execute = function () {
                        cell.Label = newName;
                        graphService.UpdateCell(cell);

                    };
                    this.UnExecute = function () {
                        cell.Label = oldName;
                        graphService.UpdateCell(cell);
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };

                var MoveCellLabelAction = function (graphService, cell, oldValues) {
                    var newName = {
                        LabelX: cell.LabelX,
                        LabelY: cell.LabelY,
                        LabelWidth: cell.LabelWidth,
                        LabelHeight: cell.LabelHeight
                    };
                    this.Name = "Move Cell Label Action";

                    this.Execute = function () {
                        cell.LabelX = newName.LabelX;
                        cell.LabelY = newName.LabelY;
                        cell.LabelWidth = newName.LabelWidth;
                        cell.LabelHeight = newName.LabelHeight;

                        graphService.UpdateCell(cell);

                    };
                    this.UnExecute = function () {
                        cell.LabelX = oldValues.LabelX;
                        cell.LabelY = oldValues.LabelY;
                        cell.LabelWidth = oldValues.LabelWidth;
                        cell.LabelHeight = oldValues.LabelHeight;

                        graphService.UpdateCell(cell);
                    };

                    this.CanExecute = function () { return !graphService.IsReadOnly; };
                    this.CanUnExecute = function () { return !graphService.IsReadOnly; };

                };



                return {
                    CreateEdgeAction: CreateEdgeAction,
                    MoveVertexAction: MoveVertexAction,
                    CopyVertexAction: CopyVertexAction, //FMA shortcut US8034
                    AddVertexAction: AddVertexAction,
                    MoveGroupVertexAction: MoveGroupVertexAction, //FMA
                    RemoveVertexAction: RemoveVertexAction,
                    RemoveEdgeAction: RemoveEdgeAction,
                    ResizeVertexAction: ResizeVertexAction,
                    RenameCellAction: RenameCellAction,
                    ConnectAndCloneAction: ConnectAndCloneAction,
                    MoveCellLabelAction: MoveCellLabelAction,
                    TransformVertexAction: TransformVertexAction,
                    EditEdgeWayPointAction: EditEdgeWayPointAction
                };
            }]);

}());


(function () {
	"use strict";
	var module = angular.module("siemens.simaticit.common.widgets.flowEditor");
	module.factory("siemens.simaticit.common.widgets.flowEditor.model.Cell", ["$log",
	function ($log) {

		var Cell = function () {
			this.Id;
			this.NID;
			this.Label;
			this.IsSelected = false;
			this.IsMouseOver = false;
			this.Renamable = true;
			this.Configurable = true;
			this.Deletable = true;
			this.HResizable = false;
			this.VResizable = false;
			this.Resizable = false;
			this.GraphService;
			this.Font = {};
		};

		return Cell;
	}]);

	module.factory("siemens.simaticit.common.widgets.flowEditor.model.Vertex",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.model.Cell",
	function ($log, Cell) {


	    var Vertex = function () {
			this.Width = 200;
			this.Height = 100;
			this.MinWidth = 100;
			this.MinHeight = 50;
			this.X;
			this.Y;
			this.Incoming;
			this.Outgoing;
			this.MaxIn = -1;
			this.MaxOut = -1;
			this.Background = 'white';
			this.Foreground = 'black';
			this.CanHaveChildren = false;
			this.ParentValueModelerId = null;
			this.EditableProps =
                [
                    { name: "Label"},
                    { name: "Width", min: this.MinWidth },
                    { name: "Height", min: this.MinHeight },
                    { name: "X", min: 0 },
		            { name: "Y", min: 0},
                    { name: "MaxIn", min: -1 },
                    { name: "MaxOut", min: -1 }
                ];
		};

		Vertex.prototype = new Cell();

		return Vertex;
	}]);

	module.factory("siemens.simaticit.common.widgets.flowEditor.model.Edge",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.model.Cell",
	function ($log, Cell) {


	    var Edge = function () {
	        this.Route = [];
			this.Source;
			this.Target;
			this.Points;
		};

		Edge.prototype = new Cell();

		return Edge;
	}]);

}());


(function () {
    "use strict";

    var module = angular.module("siemens.simaticit.common.widgets.flowEditor");

    module.constant('siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants', {
        innerPlaceholderGap: 26,
        resizeRectDimension: 20,
        selectionRectGap: 10,
        resizeRectGap: 10,
        linkRectGap: 10,
        anchorWidth: 15,
        anchorHeight: 30,
        anchorOpacity: 0.7,
        domainEdgeWidth: 3,
        edgeWidth: 3,
        renameWidth: 10,
        configWidth: 10,
        deleteWidth: 10,
        contextMenuButtonWidth: 10,
        initialWidth: 6512,
        initialHeight: 2912,
        zoomMin: 0.3,
        zoomMax: 3
    });

    module.constant('siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes', {
        hash: '#',
        oph: "outerph_",
        iph: "innerph_",
        right_anchor: "anchor_r_",
        bottom_anchor: "anchor_b_",
        left_anchor: "anchor_l_",
        top_anchor: "anchor_t_",
        edge: "edge_",
        edgewrap: "edgewrap_", //FMA usability
        edgeLabel: "edge_label_",
        edgeRoute: "edge_route_",
        selrect: "selrect_",
        ghost: "ghostLine",
        moveGhost: "ghostBlock",
        bottom: "bottom_",
        right: "right_",
        left: "left_",
        top: "top_",

        rb_corner: "rb_corner",
        rt_corner: "rt_corner",
        lb_corner: "lb_corner",
        lt_corner: "lt_corner",
        linkrect: "linkr_",
        overlay: "pzoverlay_",
        grid: "grid_",
        svg: "svg_",
        debugOPH: "debugoph_",
        debugIPH: "debugiph_",
        debugXY: "debugxy_",
        debugWH: "debugwh_",
        renamebutton: "renameb_",
        configbutton: "config_",
        deletebutton: "deleteb_",
        contextMenuButtons: ['cm1_', 'cm2_', 'cm3_', 'cm4_', 'cm5_'],
        iconButtons: ['icon1_', 'icon2_'],
        labelList: ['label1_', 'label2_'],
        xAxis: "xaxis_",
        yAxis: "yaxis_",
        canvas: "canvas_",
        after: "after",
        pan: "pan_",
        customAnchor: "customanchor_",
        graphId: "graph",
        aligner: "aligner"
    });
}());


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.DefaultScenarioService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.Actions",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants", FlowConstants]);

    function FlowConstants($log, Actions, FlowConstants) {
        this.CanBringToFront = function (graphService, cell) {
            if (this.sitFlowOutputApiService) {
                for (var i = 0; i < this.sitFlowOutputApiService.GetApis().length; i++) {
                    var api = this.sitFlowOutputApiService.GetApis()[i];
                    if (api.CanBringToFront)
                        api.CanBringToFront(graphService, cell);
                    else
                        return true;
                }
            }
        };

        this.CanSendToBack = function (graphService, cell) {
            if (this.sitFlowOutputApiService) {
                for (var i = 0; i < this.sitFlowOutputApiService.GetApis().length; i++) {
                    var api = this.sitFlowOutputApiService.GetApis()[i];
                    if (api.CanSendToBack) {
                        api.CanSendToBack(graphService, cell);
                    } else {
                        return true;
                    }
                }
            }
        };

        this.CanEdit = function (graphService, cell) {
            return true;
        };

        this.CanRemove = function (graphService, cell) {
            return true;
        };

        this.CanRename = function (graphService, cell) {
            return true;
        };

        this.MoveVertex = function (graphService, cell, startX, startY, endX, endY, parent) {
            var action = new Actions.MoveVertexAction(graphService, startX, startY, endX, endY, cell, parent);
            graphService.UndoRedoService.Record(action);

        };

        this.RemoveVertex = function (graphService, cell) {
            var action = new Actions.RemoveVertexAction(graphService, cell);
            graphService.UndoRedoService.Record(action);
        };

        this.RemoveEdge = function (graphService, cell) {
            var action = new Actions.RemoveEdgeAction(graphService, cell);
            graphService.UndoRedoService.Record(action);
        };

        this.AddVertex = function (graphService, x, y, proto, parent, children) {
            var ins = new proto();

            var halfW = ins.Width / 2 + FlowConstants.innerPlaceholderGap;
            var halfH = ins.Height / 2 + FlowConstants.innerPlaceholderGap;

            if (x - halfW < 0)
                x = halfW;
            if (y - halfH < 0)
                y = halfH;

            var action = new Actions.AddVertexAction(graphService, x, y, proto, parent, children);
            graphService.UndoRedoService.Record(action);
        };

        this.TransformVertex = function (graphService, vertex, proto) {
            var ins = new proto();
            var action = new Actions.TransformVertex(graphService, vertex, proto);
            graphService.UndoRedoService.Record(action);
        };


        this.ResizeVertex = function (graphService, cell, oWidth, oHeight) {
            var action = new Actions.ResizeVertexAction(graphService, oWidth, oHeight, cell.Width, cell.Height, cell);
            graphService.UndoRedoService.Record(action);
        };

        this.RenameCell = function (graphService, cell, oldName) {
            var action = new Actions.RenameCellAction(graphService, cell, oldName);
            graphService.UndoRedoService.Record(action);
        };

        this.CanLink = function (graphService, source, target) {
            return source !== target;
        };

        this.Name = "Default Scenario";
    }

}());

(function () {
    "use strict";

    var module = angular.module("siemens.simaticit.common.widgets.flowEditor");

    module.directive("sitFlowGraphEditor", ['siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes', function (FlowIdPrefixes) {
        return {
            restrict: 'E',
            transclude: true,
            scope:
            {
                sitScenario: '=',
                sitDebug: '=?',
                sitMultiSelect: '@?',
                sitKeyboardShortcuts: '@?',
                sitShowGrid: '@?',
                sitShowPan: '@?',
                sitShowLock: '@?',
                sitActive: '@?',
                sitMoveMode: '@?',
                sitResizeMode: '@?',
                sitGridSize: '@?',
                sitConnectAndClone: '@?',
                sitOnFlowReady: '&?',
                sitCanvasClicked: '&?'
            },
            template: "<div id='{{graphId}}' style='position:relative' ng-click='canvasClicked()' ng-show='isLoaded()' sit-flow-droppable> \
                            <svg shape-rendering='geometricPrecision' id='svg_{{graphId}}'> \
                                <defs> \
                                </defs> \
                            </svg> \
                            <div id='_rename'> \
                                <div id='_rename_text' contenteditable='true'> \
                                </div> \
							</div> \
							<div ng-show='sitScenario.sitFlowInputApi.transformProtoData && sitScenario.sitFlowInputApi.transformProtoData.length'> \
							<div id='workflow-context-menu' class='workflow-context-menu'> \
								<div class='context-menu-item' ng-repeat='item in sitScenario.sitFlowInputApi.transformProtoData' ng-click='sitScenario.sitFlowInputApi.Transform(item)'> \
									<span class='icon {{item.Group.toLowerCase()}} {{item.Icon}}'><i class=\"fa fa-{{item.Icon}}\"></i></span>{{item.Name}}  \
								</div> \
							</div> \
							</div> \
                    </div>" ,
            controller: [
		"$log",
		"$scope",
		"siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
		"siemens.simaticit.common.widgets.flowEditor.services.PluginService",
		"$element",
		"$timeout",
        "siemens.simaticit.common.widgets.flowEditor.services.SVGPlaceholderService",
        "siemens.simaticit.common.widgets.flowEditor.services.GraphCanvasService",
        "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
        "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
    function (
		$log,
		$scope,
		FlowConstants,
		PluginService,
		$element,
		$timeout,
        SVGPlaceholderService,
        GraphCanvasService,
        SharingService,
        SVGSelectorService
       ) {



        ////////PARAMETERS INIT
        var sitFlowInputApi = new Object();

        var apis = [];
        var sitFlowOutputApiService = {
            Add: function (api) {
                apis.push(api);
            },
            GetApis: function () {
                return apis;
            }
        }


        if (parseInt($scope.sitGridSize,10))
            SharingService.GridSize = parseInt($scope.sitGridSize,10);
        else
            SharingService.GridSize = 20;

        $scope.$watch("sitMoveMode", function () {
            if ($scope.sitMoveMode === "ghost" || $scope.sitMoveMode === "full")
                SharingService.MoveMode = $scope.sitMoveMode;
            else
                SharingService.MoveMode = "full";
        });


        $scope.$watch("sitResizeMode", function () {
            if ($scope.sitResizeMode === "ghost" || $scope.sitResizeMode === "full")
                SharingService.ResizeMode = $scope.sitResizeMode;
            else
                SharingService.ResizeMode = "full";
        });






        $scope.isConnectAndClone = function () {
            if (!$scope.sitConnectAndClone)
                return false;
            if ($scope.sitConnectAndClone == 'true')
                return true;
            if ($scope.sitConnectAndClone == 'false')
                return false;

            return true;
        }

        $scope.isShowGrid = function () {
            if (!$scope.sitShowGrid)
                return true;
            if ($scope.sitShowGrid == 'true')
                return true;
            if ($scope.sitShowGrid == 'false')
                return false;

            return true;
        }

        $scope.isShowPan = function () {
            if (!$scope.sitShowPan)
                return false;
            if ($scope.sitShowPan == 'true')
                return true;
            if ($scope.sitShowPan == 'false')
                return false;

            return true;
        }

        $scope.isShowLock = function () {
            if (!$scope.sitShowLock)
                return false;
            if ($scope.sitShowLock == 'true')
                return true;
            if ($scope.sitShowLock == 'false')
                return false;

            return true;
        }

        if (!$scope.sitDebug)
            SharingService.Debug = false;
        else
            SharingService.Debug = true;


        $scope.loaded = false;


        ////////CONTROLLER INIT
        this.init = function () {
            PluginService.setScenario($scope.sitScenario);

        };

        ////////SUBSCRIPTIONS

        var connectAndClone = function (args) {
            PluginService.ConnectAndClone($scope.graphCanvasService.GetGraphService(), args.cell, args.direction);
        };

        sitFlowInputApi.ActivateGraph = function (id) {
            if (id == $scope.graphId)
                $scope.sitActive = 'true';
            else {
                $scope.sitActive = 'false';
            }

            $scope.graphCanvasService.ClearSelection();
        };

        $scope.canvasClicked = function () {
            if ($scope.sitCanvasClicked) {
                $scope.sitCanvasClicked();
            }
        }


        ////////SHOW GRAPH
        $scope.isLoaded = function () {
            return $scope.loaded;
        };

        ////////DROP
        $scope.handleDrop = function (type, x, y) {
            if ($scope.graphCanvasService)
                $scope.graphCanvasService.Drop(type, x, y, $element[0]);
        };


        ////////TOOLBAR


        sitFlowInputApi.ToggleGrid = function () {
            $scope.gridChecked = !$scope.gridChecked;
            $scope.graphCanvasService.ToggleGrid();
        };

        sitFlowInputApi.TogglePan = function () {
            $scope.panChecked = !$scope.panChecked;
            $scope.graphCanvasService.TogglePan();
        };

        sitFlowInputApi.ToggleLock = function () {
            $scope.lockChecked = !$scope.lockChecked;
            $scope.graphCanvasService.ToggleLock();
        };


        sitFlowInputApi.ToggleSnap = function () {
            $scope.snapChecked = !$scope.snapChecked;
            $scope.graphCanvasService.ToggleSnap();
        };

        sitFlowInputApi.Remove = function () {
            // FMA commented and replaced
            //var cell = $scope.graphCanvasService.GetSelectedCells();
            //$scope.graphCanvasService.RemoveCell(cell);
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            $scope.graphCanvasService.RemoveMultipleCells(cells);
        };

        sitFlowInputApi.Edit = function () {
            // FMA commented and replaced
            //var cell = $scope.graphCanvasService.GetSelectedCells();
            //$scope.graphCanvasService.EditCell(cell);
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            $scope.graphCanvasService.EditCells(cells);
        };

        sitFlowInputApi.Transform = function (proto) {
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].Id === $scope.sitScenario.sitFlowInputApi.transformVertexId) {
                    PluginService.TransformVertex($scope.graphCanvasService.GetGraphService(), cells[i], proto);
                    $scope.sitScenario.sitFlowInputApi.transformProtoData = [];
                }
            }
        }


        //FMA depth control
        sitFlowInputApi.bringToFront = function () {
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            $scope.graphCanvasService.BringCellsToFront(cells);
        };
        sitFlowInputApi.bringForward = function () {
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            $scope.graphCanvasService.BringCellsForward(cells);
        };
        sitFlowInputApi.sendToBack = function () {
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            $scope.graphCanvasService.SendCellsToBack(cells);
        };
        sitFlowInputApi.sendBackward = function () {
            var cells = $scope.graphCanvasService.GetAllSelectedCells();
            $scope.graphCanvasService.SendCellsBackward(cells);
        };
        //-----------------------------------

        sitFlowInputApi.Save = function () {
            $scope.graphCanvasService.Save();
        };

        sitFlowInputApi.Undo = function () {
            $scope.graphCanvasService.Undo(true);
        };

        sitFlowInputApi.Redo = function () {
            $scope.graphCanvasService.Redo(true);
        };

        sitFlowInputApi.ZoomIn = function () {
            $scope.graphCanvasService.ZoomIn();
        };

        sitFlowInputApi.ZoomOut = function () {
            $scope.graphCanvasService.ZoomOut();
        };

        sitFlowInputApi.ZoomReset = function () {
            $scope.graphCanvasService.ZoomReset();
        };

        sitFlowInputApi.ZoomFit = function () {
            $scope.graphCanvasService.ZoomFit();
        };

        sitFlowInputApi.UpdateCell = function (cell) {
            var gs = $scope.graphCanvasService.GetGraphService();
            gs.UpdateCell(cell);
        };

        sitFlowInputApi.Refresh = function () {
            $scope.graphCanvasService.Refresh();
        };

        sitFlowInputApi.AutoGenerate = function () {
            $scope.graphCanvasService.AutoGenerate();
        };

        sitFlowInputApi.AutoGenerateAll = function () {
            $scope.graphCanvasService.AutoGenerateAll();
        };


        sitFlowInputApi.ClearSelection = function () {
            $scope.graphCanvasService.ClearSelection();
        }

        sitFlowInputApi.SelectCells = function (cells) {
            $scope.graphCanvasService.SelectCells(cells);
        }

        sitFlowInputApi.EditSettings = function () {
            $scope.graphCanvasService.EditSettings();
        }

        ////////INIT GRAPH CANVAS SERVICE
        var initGraphCanvasService = function () {
            var gcs = new GraphCanvasService($scope, function (cells) {
                for (var i = 0; i < apis.length; i++) {
                    var api = apis[i];

                    if (api) {
                        if (cells.length > 0) {
                            var gs = $scope.graphCanvasService.GetGraphService()
                            var cell = cells[0];

                            var canEdit = cell && PluginService.CanEdit(gs, cell);
                            if (api.OnCanEditChanged)
                                api.OnCanEditChanged(canEdit);

                            var canRemove = cell && PluginService.CanRemove(gs, cell);
                            if (api.OnCanRemoveChanged)
                                api.OnCanRemoveChanged(canRemove);

                            var canRename = cell && PluginService.CanRename(gs, cell);
                            if (api.OnCanRenameChanged)
                                api.OnCanRenameChanged(canRename);

                            var canBringToFront = cell && PluginService.CanBringToFront(gs, cell);
                            if (api.OnCanBringToFrontChanged)
                                api.OnCanBringToFrontChanged(canBringToFront);

                            var canSendToBack = cell && PluginService.CanSendToBack(gs, cell);
                            if (api.OnCanSendToBackChanged)
                                api.OnCanSendToBackChanged(canSendToBack);
                        }
                        else {
                            if (api.OnCanEditChanged)
                                api.OnCanEditChanged(false);

                            if (api.OnCanRemoveChanged)
                                api.OnCanRemoveChanged(false);

                            if (api.OnCanRenameChanged)
                                api.OnCanRenameChanged(false);

                            if (api.OnCanBringToFrontChanged)
                                api.OnCanBringToFrontChanged(false);

                            if (api.OnCanBringForwardChanged)
                                api.OnCanBringForwardChanged(false);

                            if (api.OnCanSendToBackChanged)
                                api.OnCanSendToBackChanged(false);

                            if (api.OnCanSendBackwardChanged)
                                api.OnCanSendBackwardChanged(false);
                        }

                        if (api.OnSelectionChanged)
                            api.OnSelectionChanged(cells);
                    }
                }

            }, function () {
                for (var i = 0; i < apis.length; i++) {
                    var api = apis[i];

                    if (api) {
                        if (api.OnCanUndoChanged)
                            api.OnCanUndoChanged($scope.graphCanvasService.CanUndo());

                        if (api.OnCanRedoChanged)
                            api.OnCanRedoChanged($scope.graphCanvasService.CanRedo());
                    }
                }
            },
                connectAndClone);

            $scope.graphCanvasService = gcs;
            var svg = SVGSelectorService.GetSVG($scope.graphId);
            if (svg != null) {
                var defs = svg.select("defs");
                defs.append("marker")
                .attr("id", "ghostmarker")
                .attr("markerWidth", "7")
                .attr("markerHeight", "7")
                .attr("refX", "0")
                .attr("refY", "3")
                .attr("orient", "auto")
                .attr("markerUnits", "strokeWidth")
                .attr("viewBox", "0 0 12 12")
                .append("path")

                .attr("d", "M0,0 L0,6 L9,3 z");

                PluginService.InitSvg($scope.graphCanvasService.GetGraphService(), defs);
            }

            if ($scope.isShowPan())
                $scope.graphCanvasService.TogglePan();

            if ($scope.isShowLock()) {
                $scope.graphCanvasService.ToggleLock();
            }

            if ($scope.sitMultiSelect == 'false')
                $scope.graphCanvasService.DisableMultiSelect();

        };



        sitFlowInputApi.LoadFlow = function (args) {
            var reset = false;
            if ($scope.graphId != null)
                reset = true;

            $scope.graphId = FlowIdPrefixes.graphId + args.Id.trim();
            $scope.graphTitle = args.Name;
            $scope.phaseId = args.PhaseId;
            $scope.loaded = true;
            $timeout(function () {
                if (!reset)
                    initGraphCanvasService();
                else {
                    $scope.graphCanvasService.GetGraphService().Clear();
                    $scope.graphCanvasService.ClearUndoRedo();
                }

                PluginService.LoadFlow($scope.graphCanvasService.GetGraphService(), args.Id, args.Arguments);

            }, 100);
        };

        if ($scope.sitKeyboardShortcuts == 'true') {
            $(document).keydown(function (e) {
                var cell, cells;
                if (e.which === 89 && e.ctrlKey) {
                    if ($scope.graphCanvasService != null && $scope.graphCanvasService.CanRedo()) {
                        $scope.graphCanvasService.Redo(false);
                        $scope.$apply();
                    }
                }
                else if (e.which === 90 && e.ctrlKey) {
                    if ($scope.graphCanvasService != null && $scope.graphCanvasService.CanUndo()) {
                        $scope.graphCanvasService.Undo(false);
                        $scope.$apply();
                    }
                }
                else if (e.which === 46) { // delete

                    if ($scope.graphCanvasService != null && !$scope.readOnly) {
                        cells = $scope.graphCanvasService.GetAllSelectedCells();
                        $scope.graphCanvasService.RemoveMultipleCells(cells);
                        $scope.$apply();
                    }
                }
                else if (e.which === 37) { // left arrow

                    if ($scope.graphCanvasService != null && !$scope.readOnly) {

                        cell = $scope.graphCanvasService.GetAllSelectedCells();
                        if (cell != null) {
                            e.preventDefault();
                            $scope.graphCanvasService.MoveLeft(cell);
                            $scope.$apply();
                        }
                    }
                }
                else if (e.which === 38) { //  up arrow

                    if ($scope.graphCanvasService != null && !$scope.readOnly) {

                        cell = $scope.graphCanvasService.GetAllSelectedCells();
                        if (cell != null) {
                            e.preventDefault();
                            $scope.graphCanvasService.MoveUp(cell);
                            $scope.$apply();
                        }
                    }
                }
                else if (e.which === 39) { //  right arrow

                    if ($scope.graphCanvasService != null && !$scope.readOnly) {

                        cell = $scope.graphCanvasService.GetAllSelectedCells();
                        if (cell != null) {
                            e.preventDefault();
                            $scope.graphCanvasService.MoveRight(cell);
                            $scope.$apply();
                        }
                    }
                }
                else if (e.which === 40) { // down arrow

                    if ($scope.graphCanvasService != null && !$scope.readOnly) {

                        cell = $scope.graphCanvasService.GetAllSelectedCells();
                        if (cell != null) {
                            e.preventDefault();
                            $scope.graphCanvasService.MoveDown(cell);
                            $scope.$apply();
                        }

                    }
                }

            });
        }


        if ($scope.sitOnFlowReady)
            $scope.sitOnFlowReady({ 'sitFlowInputApi': sitFlowInputApi, 'sitFlowOutputApiService': sitFlowOutputApiService });

    }],
            link: function (scope, element, attrs, graphCtrl) {
                graphCtrl.init();
            }
        }
    }]);

    module.directive("sitFlowDroppable", ['siemens.simaticit.common.widgets.flowEditor.services.DragDropService', function (DragDropService)  {
        return {
            link: function (scope, element) {

                var el = element[0];
                DragDropService.dragDrop(el);
                el.addEventListener(
						'dragover',
						function (e) {
						    e.dataTransfer.dropEffect = 'move';
						    // allows us to drop
						    if (e.preventDefault) e.preventDefault();
						    this.classList.add('over');
						    return false;
						},
						false
					);


                el.addEventListener(
						'dragenter',
						function (e) {
						    this.classList.add('over');
						    return false;
						},
						false
					);

                el.addEventListener(
					'dragleave',
					function (e) {
					    this.classList.remove('over');
					    return false;
					},
					false
				);

                el.addEventListener(
					'drop',
					function (e) {
					    // Stops some browsers from redirecting.
					    if (e.preventDefault) { e.preventDefault(); }

					    if (e.stopPropagation) e.stopPropagation();

					    this.classList.remove('over');

					    var type = e.dataTransfer.getData('Text');

					    var x = (e.pageX - $('#' + e.currentTarget.id).offset().left) + $('#' + e.currentTarget.id).scrollLeft();
					    var y = (e.pageY - $('#' + e.currentTarget.id).offset().top) + $('#' + e.currentTarget.id).scrollTop();

					    scope.handleDrop(type, x, y);

					    return false;
					},
					false
				);
            }
        }
    }]);


}());


(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor").directive("sitFlowProperty", [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope:
            {
                sitCell: '=?',
                sitFlowInputApi: '=?'
            },
            template: "<div class='sit-flow-propertygrid'>\
                        <div class='sit-flow-propertygrid-title'>Selected cell properties</div>\
                        <div class='sit-flow-propertygrid-propertylist'>\
                            <div data-ng-repeat='key in keys'>\
                                <div class='sit-flow-propertygrid-property'>\
                                    <div class='sit-flow-propertygrid-property-name'>{{key.key}}</div>\
                                    <div class='sit-flow-propertygrid-property-input'>\
                                        <input ng-model='key.value' ng-change='valueChanged(key)' ng-show='key.string'/>\
                                        <select ng-model='key.value' ng-options='option as option for option in [true, false]' ng-selected='{{option == key.value}}' ng-show='key.boolean' ng-change='valueChanged(key)'></select>\
                                        <input data-ng-model='key.value' ng-show='key.number'  data-ng-change='valueChanged(key)'></input>\
                                    </div>\
                                </div>\
                            </div>\
                        <div>\
                    </div> ",
            controller: ["$scope",
	function ($scope) {

	    this.init = function (element) {

	    };


	    $scope.$watch('sitCell', function (newValue, oldValue) {
	        $scope.keys = new Array();
	        var cell = newValue;
	        if (cell) {
	            var props = cell.EditableProps;
	            if (props) {
	                for (var i = 0; i < props.length; i++) {
	                    var prop = props[i];
	                    var v = cell[prop.name];
	                    if (typeof v === "string")
	                        $scope.keys.push({ 'key': prop.name, 'value': v, 'string': true });
	                    if (typeof v === "number")
	                        $scope.keys.push({ 'key': prop.name, 'value': v, 'number': true, 'min': prop.min, 'max': prop.max });
	                    if (typeof v === "boolean")
	                        $scope.keys.push({ 'key': prop.name, 'value': v, 'boolean': true });

	                }
	            }
	        }

	    });


	    $scope.valueChanged = function (key) {


	        if (key.number) {
	            var val = parseInt(key.value,10);
	            if (key.min && val < key.min || key.max && val > key.max)
	                return;

	            $scope.sitCell[key.key] = val;
	        }
	        else
	            $scope.sitCell[key.key] = key.value;
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.UpdateCell)
	            $scope.sitFlowInputApi.UpdateCell($scope.sitCell);
	    };
	}],
            link: function (scope, element, attrs, propCtrl) {
                propCtrl.init(element);
            }
        }
    }]);

})();



(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor").directive("sitFlowGraphTabs", [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: "<div id='flowEditor'><ul></ul></div>",
            scope: {
                sitOnFlowTabsReady: '&?',
                sitActiveGraphApi: '=?',
                sitScenario: '='
            },
            controller: ["$scope",
			            "$compile",
                        "$timeout",
	            function ($scope,
                    $compile,
                    $timeout) {

	                var tabs;
	                var scenario;
	                var count = 0;

	                var apis = [];
	                var sitFlowTabsOutputApiService = {
	                    Add: function (api) {
	                        apis.push(api);
	                    }
	                }

	                tabs = $("#flowEditor").tabs();
	                $scope.flows = new Array();

	                function getGraphHTML(id) {
	                    return "<div>\
                                    <div id='toolbarContainer' class='toolbarContainer'>\
                                        <sit-flow-toolbar \
	                                    sit-flow-output-api-service='sitFlowTabsOutputApiService'\
	                                    sit-flow-input-api='sitActiveGraphApi'\
	                                    sit-show-save='false'\
	                                    sit-show-edit='false'\
	                                    sit-show-rename='false'></sit-flow-toolbar>\
                                    </div>\
                                    <div id='graphContainer' class='graphContainer'>\
                                        <sit-flow-graph-editor sit-scenario='sitScenario'\
	                                    sit-on-flow-ready='flowReady(sitFlowInputApi, sitFlowOutputApiService)'\
                                        ></sit-flow-graph-editor>\
                                    </div>\
                                </div>";
	                }

	                function isAlreadyOpened(id) {
	                    for (var i = 0; i < $scope.flows.length; i++) {
	                        var f = $scope.flows[i];
	                        if (f.Id == id)
	                            return true;
	                    }
	                    return false;
	                }

	                function GetApi(id) {
	                    for (var i = 0; i < $scope.flows.length; i++) {
	                        var f = $scope.flows[i];
	                        if (f.Id == id)
	                            return $scope.flows[i].api;
	                    }

	                    return null;
	                }

	                var sitFlowTabsInputApi = new Object();

	                sitFlowTabsInputApi.LoadFlow = function (args) {

	                    var sel = "tab" + count;

	                    if (!isAlreadyOpened(sel)) {


	                        $scope.flows.push({ Id: "#"+sel });

	                        var html = getGraphHTML(args.Id);
	                        var linkFn = $compile(html);
	                        var content = linkFn($scope);


	                        var ul = tabs.find("ul");

	                        var li = ul.append("<li graph=" + args.Id + "><a href='#tab" + count + "'>" + args.Id + "</a></li>");
	                        tabs.append("<div id='" + sel + "' style='overflow:scroll'></div>");
	                        tabs.tabs("refresh");

	                        $("#tab" + count + "").append(content);
	                        $("#flowEditor").tabs({
	                            active: -1,
	                            activate: function (event, ui) {
	                                var id = ui.newPanel.selector;
	                                var api = GetApi(id);
	                                $scope.sitActiveGraphApi = api;
	                            }
	                        });

	                        $scope.flows[$scope.flows.length - 1].api.LoadFlow({ Id: args.Id, Name: args.Name });

	                        count++;

	                    }
	                };

	                $scope.flowReady = function (sitFlowInputApi, sitFlowOutputApiService) {
	                    $scope.flows[$scope.flows.length - 1].api = sitFlowInputApi;
	                };

	                if ($scope.sitOnFlowTabsReady)
	                    $scope.sitOnFlowTabsReady({ 'sitFlowTabsInputApi': sitFlowTabsInputApi, 'sitFlowTabsOutputApiService': sitFlowTabsOutputApiService });

	            }]
        }
    }]);

}());


(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor").directive("sitFlowToolbar", [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope:
               {
                   sitFlowOutputApiService: '=?',
                   sitFlowInputApi: '=?',
                   sitShowPan: '@?',
                   sitShowGrid: '@?',
                   sitShowSnap: '@?',
                   sitShowEdit: '=?',
                   sitShowRename: '@?',
                   sitShowRemove: '=?',
                   sitShowBringToFront: '=?',
                   sitShowBringForward: '=?',
                   sitShowSendToBack: '=?',
                   sitShowSendBackward: '=?',
                   sitShowUndoRedo: '=?',
                   sitShowZoom: '@?',
                   sitShowSave: '=?',
                   sitShowAutogenerate: '=?',
                   sitShowRefresh: '=?',
                   sitShowSettings: '=?',
                   readOnly: '=?',
                   bigBlockId: '=?'
               },
            templateUrl: 'common/widgets/flow/directives/toolbar.html',
            controller: ["$scope",
	function ($scope) {

	    $scope.$watch('sitShowPan', function () {
	        if ($scope.sitShowPan == null)
	            $scope.sitShowPan = true;
	        else if ($scope.sitShowPan == 'true')
	            $scope.sitShowPan = true;
	        else if ($scope.sitShowPan == 'false')
	            $scope.sitShowPan = false;
	    });

	    $scope.$watch('sitShowGrid', function () {
	        if ($scope.sitShowGrid == null)
	            $scope.sitShowGrid = true;
	        else if ($scope.sitShowGrid == 'true')
	            $scope.sitShowGrid = true;
	        else if ($scope.sitShowGrid == 'false')
	            $scope.sitShowGrid = false;
	    });

	    $scope.$watch('sitShowSnap', function () {
	        if ($scope.sitShowSnap == null)
	            $scope.sitShowSnap = true;
	        else if ($scope.sitShowSnap == 'true')
	            $scope.sitShowSnap = true;
	        else if ($scope.sitShowSnap == 'false')
	            $scope.sitShowSnap = false;
	    });

	    $scope.$watch('sitShowEdit', function () {
	        if ($scope.sitShowEdit == null)
	            $scope.sitShowEdit = true;
	        else if ($scope.sitShowEdit == 'true')
	            $scope.sitShowEdit = true;
	        else if ($scope.sitShowEdit == 'false')
	            $scope.sitShowEdit = false;
	    });

	    $scope.$watch('sitShowRename', function () {
	        if ($scope.sitShowRename == null)
	            $scope.sitShowRename = true;
	        else if ($scope.sitShowRename == 'true')
	            $scope.sitShowRename = true;
	        else if ($scope.sitShowRename == 'false')
	            $scope.sitShowRename = false;
	    });

	    $scope.$watch('sitShowRemove', function () {
	        if ($scope.sitShowRemove == null)
	            $scope.sitShowRemove = true;
	        else if ($scope.sitShowRemove == 'true')
	            $scope.sitShowRemove = true;
	        else if ($scope.sitShowRemove == 'false')
	            $scope.sitShowRemove = false;
	    });

	    $scope.$watch('sitShowBringToFront', function () {
	        if ($scope.sitShowBringToFront == null)
	            $scope.sitShowBringToFront = true;
	        else if ($scope.sitShowBringToFront == 'true')
	            $scope.sitShowBringToFront = true;
	        else if ($scope.sitShowBringToFront == 'false')
	            $scope.sitShowBringToFront = false;
	    });

	    $scope.$watch('sitShowBringForward', function () {
	        if ($scope.sitShowBringForward == null)
	            $scope.sitShowBringForward = true;
	        else if ($scope.sitShowBringForward == 'true')
	            $scope.sitShowBringForward = true;
	        else if ($scope.sitShowBringForward == 'false')
	            $scope.sitShowBringForward = false;
	    });

	    $scope.$watch('sitShowSendToBack', function () {
	        if ($scope.sitShowSendToBack == null)
	            $scope.sitShowSendToBack = true;
	        else if ($scope.sitShowSendToBack == 'true')
	            $scope.sitShowSendToBack = true;
	        else if ($scope.sitShowSendToBack == 'false')
	            $scope.sitShowSendToBack = false;
	    });

	    $scope.$watch('sitShowSendBackward', function () {
	        if ($scope.sitShowSendBackward == null)
	            $scope.sitShowSendBackward = true;
	        else if ($scope.sitShowSendBackward == 'true')
	            $scope.sitShowSendBackward = true;
	        else if ($scope.sitShowSendBackward == 'false')
	            $scope.sitShowSendBackward = false;
	    });

	    $scope.$watch('sitShowUndoRedo', function () {
	        if ($scope.sitShowUndoRedo == null)
	            $scope.sitShowUndoRedo = true;
	        else if ($scope.sitShowUndoRedo == 'true')
	            $scope.sitShowUndoRedo = true;
	        else if ($scope.sitShowUndoRedo == 'false')
	            $scope.sitShowUndoRedo = false;
	    });

	    $scope.$watch('sitShowZoom', function () {
	        if ($scope.sitShowZoom == null)
	            $scope.sitShowZoom = true;
	        else if ($scope.sitShowZoom == 'true')
	            $scope.sitShowZoom = true;
	        else if ($scope.sitShowZoom == 'false')
	            $scope.sitShowZoom = false;
	    });

	    $scope.$watch('sitShowSave', function () {
	        if ($scope.sitShowSave == null)
	            $scope.sitShowSave = true;
	        else if ($scope.sitShowSave == 'true')
	            $scope.sitShowSave = true;
	        else if ($scope.sitShowSave == 'false')
	            $scope.sitShowSave = false;
	    });


	    $scope.$watch('sitShowAutogenerate', function () {
	        if ($scope.sitShowAutogenerate == null)
	            $scope.sitShowAutogenerate = true;
	        else if ($scope.sitShowAutogenerate == 'true')
	            $scope.sitShowAutogenerate = true;
	        else if ($scope.sitShowAutogenerate == 'false')
	            $scope.sitShowAutogenerate = false;
	    });


	    $scope.$watch('sitShowRefresh', function () {
	        if ($scope.sitShowRefresh == null)
	            $scope.sitShowRefresh = true;
	        else if ($scope.sitShowRefresh == 'true')
	            $scope.sitShowRefresh = true;
	        else if ($scope.sitShowRefresh == 'false')
	            $scope.sitShowRefresh = false;
	    });

	    $scope.$watch('sitFlowOutputApiService', function () {
	        if ($scope.sitFlowOutputApiService) {
	            $scope.sitFlowOutputApiService.Add({

	                OnCanRedoChanged: function (canRedo) {
	                    $scope.canRedo = $scope.sitShowUndoRedo && canRedo;
	                },
	                OnCanUndoChanged: function (canUndo) {
	                    $scope.canUndo = $scope.sitShowUndoRedo && canUndo;
	                },
	                OnCanEditChanged: function (canEdit) {
	                    $scope.canEdit = $scope.sitShowEdit && canEdit;
	                },
	                OnCanRemoveChanged: function (canRemove) {
	                    $scope.canRemove = $scope.sitShowRemove && canRemove;
	                },
	                //FMA
	                OnCanBringToFrontChanged: function (canBringToFront) {
	                    $scope.canBringToFront = $scope.sitShowBringToFront && canBringToFront;
	                },
	                //OnCanBringForwardChanged: function (canBringForward) {
	                //    $scope.canBringForward = $scope.sitShowBringForward && canBringForward;
	                //},
	                OnCanSendToBackChanged: function (canSendToBack) {
	                    $scope.canSendToBack = $scope.sitShowSendToBack && canSendToBack;
	                },
	                //OnCanSendBackwardChanged: function (canSendBackward) {
	                //    $scope.canSendBackward = $scope.sitShowSendBackward && canSendBackward;
	                //},
                    //----
	                OnCanRenameChanged: function (canRename) {
	                    $scope.canRename = $scope.sitShowRename && canRename;
	                }
	            });
	        }
	    });



	    this.init = function (element) {

	    };

	    $scope.snapChecked = true;
	    $scope.gridChecked = $scope.readOnly ? false : true;
	    $scope.panChecked = false;

	    $scope.toggleGrid = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.ToggleGrid)
	            $scope.sitFlowInputApi.ToggleGrid();

	        $scope.gridChecked = !$scope.gridChecked;
	    };

	    $scope.toggleSnap = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.ToggleSnap)
	            $scope.sitFlowInputApi.ToggleSnap();
	        $scope.snapChecked = !$scope.snapChecked;
	    };

	    $scope.rename = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Rename)
	            $scope.sitFlowInputApi.Rename();
	    };

	    $scope.undo = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Undo)
	            $scope.sitFlowInputApi.Undo();
	    };

	    $scope.redo = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Redo)
	            $scope.sitFlowInputApi.Redo();
	    };

	    $scope.togglePan = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.TogglePan)
	            $scope.sitFlowInputApi.TogglePan();
	        $scope.panChecked = !$scope.panChecked;
	    };

	    $scope.zoomin = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.ZoomIn)
	            $scope.sitFlowInputApi.ZoomIn();
	    };

	    $scope.zoomout = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.ZoomOut)
	            $scope.sitFlowInputApi.ZoomOut();
	    };

	    $scope.zoomreset = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.ZoomReset)
	            $scope.sitFlowInputApi.ZoomReset();
	    };

	    $scope.zoomfit = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.ZoomFit)
	            $scope.sitFlowInputApi.ZoomFit();
	    };

	    $scope.remove = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Remove)
	            $scope.sitFlowInputApi.Remove();
	    };

	    $scope.bringToFront = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.bringToFront)
	            $scope.sitFlowInputApi.bringToFront();
	    };

	    $scope.bringForward = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.bringForward)
	            $scope.sitFlowInputApi.bringForward();
	    };

	    $scope.sendToBack = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.sendToBack)
	            $scope.sitFlowInputApi.sendToBack();
	    };

	    $scope.sendBackward = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.sendBackward)
	            $scope.sitFlowInputApi.sendBackward();
	    };

	    $scope.rename = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Rename)
	            $scope.sitFlowInputApi.Rename();
	    };

	    $scope.edit = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Edit)
	            $scope.sitFlowInputApi.Edit();
	    };

	    $scope.save = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Save)
	            $scope.sitFlowInputApi.Save();
	    };

	    $scope.refresh = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.Refresh)
	            $scope.sitFlowInputApi.Refresh();
	    };


	    $scope.editSettings = function () {
	        if ($scope.sitFlowInputApi && $scope.sitFlowInputApi.EditSettings)
	            $scope.sitFlowInputApi.EditSettings();
	    };

	}],
            link: function (scope, element, attrs, toolbarCtrl) {
                toolbarCtrl.init(element);
            }
        }
    }]);

})();


(function () {
    "use strict";

    var module = angular.module("siemens.simaticit.common.widgets.flowEditor");

    module.directive("sitFlowToolbox", [function () {

        return {
            restrict: 'E',
            scope:
				{
				    sitScenario: '=',
				    sitTitle: '@?',
				    sitMode: '@?'
				},
            templateUrl: 'common/widgets/flow/directives/toolbox.html',
            controller: ["$scope", "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
	function ($scope, PluginService) {

	    var vertexes;

	    if ($scope.sitMode == null)
	        $scope.sitMode = 'tiles';
	    if ($scope.sitMode != 'tiles' && $scope.sitMode != 'list')
	        $scope.sitMode = 'tiles';

	    this.init = function (element) {

	        PluginService.setScenario($scope.sitScenario);
	        var _obj = {};
	        vertexes = PluginService.GetVertexes();
	        if (vertexes) {
	            for (var i = 0; i < vertexes.length; i++) {
	                var _vertex = new vertexes[i]();
	                if (!_obj[_vertex.Group]) {
	                    _obj[_vertex.Group] = [];
	                }
	                _obj[_vertex.Group].push(_vertex);
	            }
	            $scope.blocks = _obj;
	        }
	    };

	    $scope.switchMode = function () {
	        if($scope.sitMode == 'tiles')
	            $scope.sitMode = 'list';
	        else
	            $scope.sitMode = 'tiles';
	    };

	}],
            link: function (scope, element, attrs, paletteCtrl) {
                paletteCtrl.init(element);
            }
        }
    }]);

    module.directive("sitFlowToolboxDragOnClick", ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, paletteCtrl) {
                var el = d3.select(element[0]);
                el.on('mouseup', function ()
                {
                    var vertex = scope.item;
                    $rootScope.$broadcast("drop", {type: vertex.Type})
                })
            }
        }
    }]);

    module.directive("sitFlowToolboxIcon", [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, paletteCtrl) {

                var drawIcon = function (iconSize, element, preview, vertex) {
                    var el = element;
                    var scale = d3.scale.linear()
                                 .domain([0, Math.max(vertex.Width, vertex.Height)])
                                 .range([0, iconSize]);

                    var w = scale(vertex.Width) - 2;
                    var h = scale(vertex.Height) - 2;

                    var ph = el
                        .append("svg")
                        .attr('width', iconSize)
                        .attr('height', iconSize)
                        //.append('svg')
                        //.attr('width', w)
                        //.attr('height', h)
                        //.attr('x', (iconSize - w)  / 2)
                        //.attr('y', (iconSize - h) / 2);

                    vertex.Width = w;
                    vertex.Height = h;
                    vertex.Draw(ph, true, preview);
                    return ph;
                };
                var iconSize = 40;
                var vertex = scope.item;
                var el = d3.select(element[0]);
                var ph = drawIcon(iconSize, el, false, vertex);


            }
        }
    }]);

    module.directive('sitFlowToolboxDraggable', ['siemens.simaticit.common.widgets.flowEditor.services.DragDropService', function (DragDropService) {
        return function (scope, element) {

            var el = element[0];

            el.draggable = true;
            DragDropService.dragDrop(el);
            el.addEventListener(
				'dragstart',
				function (e) {

				    var type = this.attributes["id"].value;

				    e.dataTransfer.effectAllowed = 'move';
				    e.dataTransfer.setData('Text', type);
				    e.target.style.opacity = .5;
				    return false;
				},
				false
			);

            el.addEventListener(
				'dragend',
				function (e) {
				    e.target.style.opacity = 1;
				    return false;
				},
				false
			);
        }
    }]);
}());


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.APIService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.model.Vertex",

	function ($log, Vertex) {

	    var cellMap;

	    function FindVertex(vertexes, id) {
	        for (var i = 0; i < vertexes.length; i++) {
	            if (vertexes[i].Id == id) {
	                return vertexes[i];
	            }
	        }
	        return null;
	    }

	    function InitCellMap(scenario) {
	        var vertexes = scenario.GetVertexes();
	        var edges = scenario.GetEdges();
	        cellMap = {}
	        var vx = vertexes.concat(edges);
	        for (var i = 0; i < vx.length; i++) {
	            var inst = new vx[i]();
	            cellMap[inst.Type] = vx[i];
	        }
	        return cellMap;
	    }

	    function _AddVertex (graphService, v) {
	        if (!cellMap[v.Type]) {
	            return;
	        }
	        var vertex = new cellMap[v.Type];
	        if (vertex != null) {
	            vertex.Id = v.Id;
	            vertex.NId = v.NId;
	            vertex.X = v.X;
	            vertex.Y = v.Y;
	            vertex.BusinessObject = v.BusinessObject;
	            if (v.Width) vertex.Width = v.Width;
	            if (v.Height) vertex.Height = v.Height;
	            if (v.Label) vertex.Label = v.Label;
	            vertex.Outgoing = [];
	            vertex.Incoming = [];
	            graphService.AddCell(vertex, null, true);

	        }
	    }

	    function _AddEdge (graphService, e) {
	        if (!cellMap[e.Type]) {
	            return;
	        }
	        var edge = new cellMap[e.Type];
	        if (edge != null) {
	            edge.Id = e.Id;
	            edge.NId = e.NId;
	            edge.SourcePos = e.SourcePos;
	            edge.TargetPos = e.TargetPos;
	            edge.LabelX = e.LabelX;
	            edge.LabelY = e.LabelY;
	            edge.LabelHeight = e.LabelHeight;
	            edge.BusinessObject = e.BusinessObject;
	            var source = FindVertex(graphService.Cells, e.Source);
	            var target = FindVertex(graphService.Cells, e.Target);
	            edge.Points = _.map(e.Points, function (item) {
	                return { x: item.X, y: item.Y }
	            });
	            if (source != null && target != null) {
	                edge.Label = e.Label;
	                if (e.Color) {
	                    edge.Color = e.Color;
	                }
	                graphService.AddEdge(edge, source, target, true, edge.Points);
	            }
	        }
	    }

	    function _RemoveVertex (graphService, vertexId) {
	        var vertex = FindVertex(graphService.Cells, vertexId);
	        if (!vertex) {
	            return;
	        }
	        if (vertex.OnRemove) {
	            vertex.OnRemove();
	        }
	        graphService.RemoveVertex(vertex, true);

	    }

	    function _RemoveEdge(graphService, edgeId) {
	        var edge = FindVertex(graphService.Cells, edgeId);
	        if (!edge) {
	            return;
	        }
	        if (edge.OnRemove) {
	            edge.OnRemove();
	        }
	        graphService.RemoveEdge(edge, true);
	    }

	    function _EditVertex(graphService, v) {
	        var vertex = FindVertex(graphService.Cells, v.Id);
	        if (!vertex) {
	            return;
	        }
	        vertex.X = v.X;
	        vertex.Y = v.Y;
	        if (v.Width) {
	            vertex.Width = v.Width;
	        }
	        if (v.Height) {
	            vertex.Height = v.Height;
	        }
	        if (v.Label) {
	            vertex.Label = v.Label;
	        }
	        graphService.UpdateVertex(vertex, true);

	    }

	    function _EditEdge(graphService, v) {
	        var edge = FindVertex(graphService.Cells, v.Id);
	        if (!edge) return;
	        if (v.Label) edge.Label = v.Label;
	        if (v.Color) edge.Color = v.Color;
	        graphService.UpdateCell(edge, true);

	    }

	    function Load (graphService, model) {

	        var i;
	        graphService.StartSession();
	        var modelVertexes = new Array();

	        for (i = 0; i < model.vertexes.length; i++) {
	            _AddVertex(graphService, model.vertexes[i]);
	        }

	        for (i = 0; i < model.edges.length; i++) {
	            var e = model.edges[i];
	            _AddEdge(graphService, e);
	        }


	        graphService.EndSession();

	        return;
	    }

	    function AddVertex(graphService, vertex) {
	        graphService.StartSession();
	        _AddVertex(graphService, vertex);
	        graphService.EndSession();
	    }

	    function AddEdge(graphService, edge) {
	        graphService.StartSession();
	        _AddEdge(graphService, edge);
	        graphService.EndSession();
	    }

	    function EditVertex(graphService, vertex) {
	        graphService.StartSession();
	        _EditVertex(graphService, vertex);
	        graphService.EndSession();
	    }

	    function EditEdge(graphService, edge) {
	        graphService.StartSession();
	        _EditEdge(graphService, edge);
	        graphService.EndSession();
	    }

	    function RemoveVertex(graphService, vertex) {
	        graphService.StartSession();
	        _RemoveVertex(graphService, vertex);
	        graphService.EndSession();
	    }

	    function RemoveEdge(graphService, edge) {
	        graphService.StartSession();
	        _RemoveEdge(graphService, edge);
	        graphService.EndSession();
	    }

	    function Save(graphService) {
	        var vertexes = [];
	        var edges = [];
	        for (var i = 0; i < graphService.Cells.length; i++) {
	            var cell = graphService.Cells[i];
	            if (cell instanceof Vertex) {
	                vertexes.push({
	                    Id: cell.Id,
	                    X: cell.X,
	                    Y: cell.Y,
	                    Label: cell.Label
	                });
	            }
	            else {
	                edges.push({
	                    Id: cell.Id,
	                    Source: cell.Source.Id,
	                    Target: cell.Target.Id,
	                    Label: cell.Target.Id,
	                    Color: cell.Target.Id
	                });
	            }
	        }
	        return {
	            edges: edges,
	            vertexes: vertexes
	        }
	    }

	    function Clear(graphService) {
	        graphService.StartSession();
	        var ids = [];
	        for (var i = 0; i < graphService.Cells.length; i++) {
	            var cell = graphService.Cells[i];
	            if (cell instanceof Vertex) {
	                ids.push(graphService.Cells[i].Id)
	            }
	        }
	        for (i = 0; i < ids.length; i++) {

	            _RemoveVertex(graphService, ids[i]);

	        }

	        graphService.EndSession();
	    }

	    return {
	        Load: Load,
	        InitCellMap: InitCellMap,
	        AddVertex: AddVertex,
	        AddEdge: AddEdge,
	        EditVertex: EditVertex,
	        EditEdge: EditEdge,
	        RemoveVertex: RemoveVertex,
	        RemoveEdge: RemoveEdge,
	        Save: Save,
	        Clear: Clear
	    };
	}]);
}());

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
    .factory("siemens.simaticit.common.widgets.flowEditor.services.AnchorService",
    ["$log",
     "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
     "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
     "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
     'siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants',
	function ($log, PluginService, SVGSelectorService, SVGAnchorService, FlowConstants) {

	    var AnchorService = function (graphService, mainCanvas, scope, connectAndClone) {

	        var oMouse;
	        var startCell;
	        var isLinking;
	        var EPSILON = 0.001;
	        var EPSILON_SQUARE = EPSILON * EPSILON;

	        function side(x1, y1, x2, y2, x, y) {
	            return (x1 - x) * (y2 - y) - (x2 - x) * (y1 - y);
	        }

	        function naivePointInTriangle(x1, y1, x2, y2, x3, y3, x, y) {
	            var checkSide1 = side(x1, y1, x2, y2, x, y) >= 0;
	            var checkSide2 = side(x2, y2, x3, y3, x, y) >= 0;
	            var checkSide3 = side(x3, y3, x1, y1, x, y) >= 0;
	            return checkSide1 && checkSide2 && checkSide3;
	        }

	        function pointInTriangleBoundingBox(x1, y1, x2, y2, x3, y3, x, y) {
	            var xMin = Math.min(x1, Math.min(x2, x3)) - EPSILON;
	            var xMax = Math.max(x1, Math.max(x2, x3)) + EPSILON;
	            var yMin = Math.min(y1, Math.min(y2, y3)) - EPSILON;
	            var yMax = Math.max(y1, Math.max(y2, y3)) + EPSILON;

	            if (x < xMin || xMax < x || y < yMin || yMax < y) {
	                return false;
	            }
	            return true;
	        }

	        function distanceSquarePointToSegment(x1, y1, x2, y2, x, y) {
	            var p1_p2_squareLength = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
	            var dotProduct = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / p1_p2_squareLength;
	            if (dotProduct < 0) {
	                return (x - x1) * (x - x1) + (y - y1) * (y - y1);
	            }
	            else if (dotProduct <= 1) {
	                var p_p1_squareLength = (x1 - x) * (x1 - x) + (y1 - y) * (y1 - y);
	                return p_p1_squareLength - dotProduct * dotProduct * p1_p2_squareLength;
	            }
	            else {
	                return (x - x2) * (x - x2) + (y - y2) * (y - y2);
	            }
	        }

	        function accuratePointInTriangle(x1, y1, x2, y2, x3, y3, x, y) {
	            if (!pointInTriangleBoundingBox(x1, y1, x2, y2, x3, y3, x, y)) {
	                return false;
	            }
	            if (naivePointInTriangle(x1, y1, x2, y2, x3, y3, x, y)) {
	                return true;
	            }
	            if (distanceSquarePointToSegment(x1, y1, x2, y2, x, y) <= EPSILON_SQUARE) {
	                return true;
	            }
	            if (distanceSquarePointToSegment(x2, y2, x3, y3, x, y) <= EPSILON_SQUARE) {
	                return true;
	            }
	            if (distanceSquarePointToSegment(x3, y3, x1, y1, x, y) <= EPSILON_SQUARE) {
	                return true;
	            }
	            return false;
	        }

	        function draganchorstart() {
	            if (!d3.event.sourceEvent.ctrlKey) {
	                var id = SVGSelectorService.GetVertexIdFromNode(this);
	                startCell = graphService.GetCellById(id);
	                oMouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	                isLinking = true;
	                var pos = '';
	                if (oMouse[0] < startCell.X){
	                    pos = 'left';
	                }
	                else if (oMouse[1] < startCell.Y){
	                    pos = 'top';
	                }
	                else if (oMouse[1] > startCell.Y + startCell.Height) {
	                    pos = 'bottom';
	                }
	                else {
	                    pos = 'right';
	                }
	                startCell._pos = pos;
	                $log.debug("[draganchorstart] executed for cell " + startCell.Id);
	                document.body.style.cursor = "alias";
	                d3.event.sourceEvent.stopPropagation();
	            }
	        }

	        function draganchormove() {
	            if (isLinking) {
	                var mouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	                SVGAnchorService.RemoveGhost();
	                SVGAnchorService.AddGhost(mainCanvas, oMouse[0], oMouse[1], mouse[0], mouse[1], scope.graphId);
	                $log.debug("[draganchormove] executed");
	                document.body.style.cursor = "alias";
	                d3.event.sourceEvent.stopPropagation();
	            }
	        }

	        function draganchorend() {
	            if (isLinking) {
	                var mouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	                var mx = mouse[0];
	                var my = mouse[1];
	                var elems = SVGSelectorService.GetVertexFromPoint(mainCanvas, mx, my);
	                if (elems.node() != null) {
	                    var id = SVGSelectorService.GetId(elems);
	                    if (id != null) {
	                        var endCell = graphService.GetCellById(id);

	                        var cx = endCell.X + (endCell.Width) / 2
	                        var cy = endCell.Y + (endCell.Height) / 2

	                        var p1x = endCell.X - FlowConstants.resizeRectDimension;
	                        var p1y = endCell.Y - FlowConstants.resizeRectDimension;

	                        var p2x = (endCell.X - FlowConstants.resizeRectDimension) + (endCell.Width + (FlowConstants.resizeRectDimension * 2));
	                        var p2y = (endCell.Y - FlowConstants.resizeRectDimension);

	                        var p3x = (endCell.X - FlowConstants.resizeRectDimension) + (endCell.Width + (FlowConstants.resizeRectDimension * 2));
	                        var p3y = (endCell.Y - FlowConstants.resizeRectDimension) + (endCell.Height + (FlowConstants.resizeRectDimension * 2));

	                        var p4x = (endCell.X - FlowConstants.resizeRectDimension);
	                        var p4y = (endCell.Y - FlowConstants.resizeRectDimension) + (endCell.Height + (FlowConstants.resizeRectDimension * 2));

	                        // Left (default) Triangle
	                        var pos = 'left';

	                        if (accuratePointInTriangle(p1x, p1y, p2x, p2y, cx, cy, mx, my)) {
	                            // Top Triangle
	                            pos = 'top';
	                        } else if (accuratePointInTriangle(cx, cy, p2x, p2y, p3x, p3y, mx, my)) {
	                            // Right Triangle
	                            pos = 'right';
	                        } else if (accuratePointInTriangle(p4x, p4y, cx, cy, p3x, p3y, mx, my)) {
	                            // Bottom Triangle
	                            pos = 'bottom';
	                        }
	                        endCell._pos = pos;

	                        var maxincheck = endCell.MaxIn && endCell.MaxIn > endCell.Incoming.length || endCell.MaxIn == -1;
	                        var cl = PluginService.CanLink(graphService, startCell, endCell);
	                        if (maxincheck && cl) {
	                            PluginService.AddEdge(graphService, startCell, endCell);
	                        }
	                    }
	                    $log.debug("[draganchorend] executed for cell " + endCell.Id);
	                }

	                SVGAnchorService.RemoveGhost();
	                scope.$apply();
	                isLinking = false;
	                document.body.style.cursor = "auto";
	                d3.event.sourceEvent.stopPropagation();
	            }
	        }

	        function rightAnchorMouseUp(e) {
	            if (d3.event.ctrlKey) {
	                mouseUp("right", this);
	            }
	        }

	        function bottomAnchorMouseUp(e) {
	            if (d3.event.ctrlKey) {
	                mouseUp("bottom", this);
	            }
	        }

	        function leftAnchorMouseUp(e) {
	            if (d3.event.ctrlKey) {
	                mouseUp("left", this);
	            }
	        }

	        function topAnchorMouseUp(e) {
	            if (d3.event.ctrlKey) {
	                mouseUp("top", this);
	            }
	        }

	        function mouseUp(dir, el) {
	            var id = SVGSelectorService.GetVertexIdFromNode(el);
	            var cell = graphService.GetCellById(id);
	            var args = {
	                cell: cell,
	                direction: dir
	            };
	            connectAndClone(args);
	        }

	        this.IsLinking = function () {
	            return isLinking;
	        };

	        this.GetStartCell = function () {
	            return startCell;
	        };

	        this.AttachAnchorEvents = function (cell) {
	            var drag = d3.behavior.drag();
	            drag.on("dragstart", draganchorstart)
                    .on("drag", draganchormove)
                    .on("dragend", draganchorend);

	            if (cell.DrawAnchor) {
	                var ca = SVGSelectorService.GetCustomAnchor(cell.Id);
	                ca.call(drag);
	            }
	            else {
	                var r = SVGSelectorService.GetRightAnchor(cell.Id);
	                r.call(drag);
	                var b = SVGSelectorService.GetBottomAnchor(cell.Id);
	                b.call(drag);
	                var l = SVGSelectorService.GetLeftAnchor(cell.Id);
	                l.call(drag);
	                var t = SVGSelectorService.GetTopAnchor(cell.Id);
	                t.call(drag);

	                if (scope.isConnectAndClone()) {
	                    r.on("mouseup", rightAnchorMouseUp);
	                    b.on("mouseup", bottomAnchorMouseUp);
	                    l.on("mouseup", leftAnchorMouseUp);
	                    t.on("mouseup", topAnchorMouseUp);
	                }
	            }

	        };

	    };

	    return AnchorService;

	}]);

})();

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.ClickService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
	function ($log, FlowConstants, PluginService, SVGSelectorService) {

	    var ClickService = function (graphService, mainCanvas, tools, scope, pzService) {


	        var canvasclick = function () {

	            ///////////DETECT NEAR EDGE
	            var svg = SVGSelectorService.GetSVG(scope.graphId).node();

	            var mouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	            var rpos = svg.createSVGRect();
	            rpos.x = mouse[0];
	            rpos.y = mouse[1];
	            rpos.width = 30;
	            rpos.height = 30;
	        };

	        this.AttachClickOnCanvas = function () {
	        };

	        var vertexClick = function (e) {
	            var id = SVGSelectorService.GetVertexIdFromNode(this);
	            var cell = graphService.GetCellById(id);
	            tools.ClearSelection();
	            tools.Select(cell);
	            d3.event.stopPropagation();
	            $log.debug("[click] executed for cell " + cell.Id);
	        };

	        this.AttachVertexClickEvent = function (cell) {
	            var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
	            //FMA following commented
	            //ph.on("click", vertexClick);
	            //ph.onclick = vertexClick;
	            $log.debug("[AttachVertexClickEvent] executed for cell " + cell.Id);

	            var stop = function () {
	                d3.event.stopPropagation();
	            };

	            ph.on("wheel.zoom", stop)
                .on("mousewheel.zoom", stop)
                .on("DOMMouseScroll.zoom", stop)

	        };

	        var edgeClick = function () {
	            var e = d3.select(this);
	            var id = SVGSelectorService.GetId(e);
	            if (id != null) {
	                var cell = graphService.GetCellById(id);
	                tools.ClearSelection();
	                tools.Select(cell);
	                d3.event.stopPropagation();
	            }
	            $log.debug("[click] executed for cell " + cell.Id);
	        };

	        this.AttachEdgeClickEvent = function (cell) {
	            var edge = SVGSelectorService.GetEdge(cell.Id);
	            edge.on("click", edgeClick);

	            //////////MOUSE OVER TO MAKE IT EASY CLICK ON EDGE
	            edge.on("mouseover", function () {
	                document.body.style.cursor = "pointer";
	                if (cell.focus && cell.IsSelected && (cell.Movable === undefined || cell.Movable == true)) {
	                    if (cell._active !== true)
	                        cell.focus(d3.mouse(this));
	                    cell._active = true;
	                }
	            });
	            edge.on("mousemove", function () {
	                if (cell.move && cell.IsSelected && (cell.Movable === undefined || cell.Movable == true)) {
	                    if (cell._active === true)
	                        cell.move(d3.mouse(this), cell);
	                }
	            })
	            edge.on("mouseout", function () {
	                document.body.style.cursor = "auto";
	            });

	            $log.debug("[AttachEdgeClickEvent] executed for cell " + cell.Id);
	        };



	    };

	    return ClickService;

	}]);

})();

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.ContextMenuService",
        ["$log", "$rootScope",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
                "siemens.simaticit.common.widgets.flowEditor.model.Vertex",
    "siemens.simaticit.common.widgets.flowEditor.model.Edge",
	function ($log, $rootScope, FlowConstants, PluginService, SVGSelectorService, Vertex, Edge) {

	    var ContextMenuService = function (graphService, mainCanvas, tools, scope) {
	        this.attachContextMenuEvents = function (cell, graphService, scope) {
	            var buttons = SVGSelectorService.getContextMenuButtons(cell.Id);
	            buttons.forEach(function (button, index) {

	                button.on("click", function (e) {
	                    setTimeout(function () {

	                        $('#workflow-context-menu').css({ display: 'none' });
	                        if (cell.ContextMenu[index].onClick) {
	                            if (typeof cell.ContextMenu[index].onClick === 'string') {
	                                PluginService.OnContextAction(graphService, cell, cell.ContextMenu[index].onClick);
	                                if (cell.ContextMenu[index].onClick === 'edit') {
	                                    PluginService.EditVertex(graphService, cell);
	                                } else if (cell.ContextMenu[index].onClick === 'delete') {
	                                    cell.IsSelected = false;
	                                    if (cell instanceof Vertex) {
	                                        PluginService.RemoveVertex(graphService, cell);
	                                    } else {
	                                        PluginService.RemoveEdge(graphService, cell);
	                                    }
	                                    $rootScope.$broadcast('siemens.simaticit.common.widgets.flowEditor.deleteCell', { deletedCell: cell });
	                                } else if (cell.ContextMenu[index].onClick === 'rename') {
	                                    //////////GET CELL AND OPH
	                                    var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
	                                    if (ph[0][0] === null) {
	                                        ph = SVGSelectorService.GetSelRect(cell.Id);
	                                    }
	                                    //////////APPEND INPUT AND FOCUS

	                                    var marginTop = cell.Height / 2 - 10 + FlowConstants.innerPlaceholderGap;
	                                    var marginLeft = FlowConstants.innerPlaceholderGap + 1;
	                                    var width = cell.Width - 6;

	                                    var fe = $('#_rename');
	                                    var inp = $('#_rename_text');
	                                    fe.css({
	                                        'min-height': ph[0][0].getAttribute('height') + 'px',
	                                        height: 'auto',
	                                        width: ph[0][0].getAttribute('width') + 'px',
	                                        left: ph[0][0].getAttribute('x') + 'px', // cell.X,
	                                        top: ph[0][0].getAttribute('y') + 'px'//cell.Y
	                                    });

	                                    //////////KEEP OLD NAME
	                                    var oldName = cell.Label;
	                                    if (oldName)
	                                        inp.html(oldName.replace(/\n/g, '<br>'));

	                                    inp.one('focus', function () {
	                                        var cell = this;
	                                        var range, selection;
	                                        if (document.body.createTextRange) {
	                                            range = document.body.createTextRange();
	                                            range.moveToElementText(cell);
	                                            range.select();
	                                        } else if (window.getSelection) {
	                                            selection = window.getSelection();
	                                            range = document.createRange();
	                                            range.selectNodeContents(cell);
	                                            selection.removeAllRanges();
	                                            selection.addRange(range);
	                                        }
	                                    });

	                                    inp.focus().select();
	                                    //////////ATTACH BLUR
	                                    inp.one('blur', function () {
	                                        cell.Label = inp[0].innerText;
	                                        fe.css({ height: 0, width: 0, left: '-5px', top: '-5px' });
	                                        inp.text('');
	                                        PluginService.RenameCell(graphService, cell, oldName);
	                                        graphService.UpdateCell(cell);
	                                        graphService.UpdateCell(cell);
	                                        if (cell.Outgoing[0].length) {
	                                            graphService.UpdateCell(cell.Outgoing[0]);
	                                        }
	                                        scope.$apply();
	                                    });
	                                    //////////HIDE RENAME BUTTON
	                                    var rb = SVGSelectorService.GetRenameButton(cell.Id);
	                                    rb.transition().duration(300).style("opacity", 0);

	                                    $log.debug("[click] executed for cell " + cell.Id);
	                                } else if (cell.ContextMenu[index].onClick === 'action') {
	                                    PluginService.ContextAction(graphService, cell);
	                                } else if (cell.ContextMenu[index].onClick === 'transform') {
	                                    ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
	                                    var dimetions = ph[0][0].getBoundingClientRect();
	                                    var parentDimentions = ph[0][0].parentNode.parentNode.getBoundingClientRect();
	                                    fe = $('#workflow-context-menu');
	                                    var left = dimetions.right - parentDimentions.left - FlowConstants.innerPlaceholderGap * 2;// + dimetions.width;
	                                    var top = dimetions.bottom - parentDimentions.top - FlowConstants.innerPlaceholderGap * 2;// + dimetions.height;
	                                    fe.css({
	                                        display: 'block',
	                                        left: left + 'px',
	                                        top: top + 'px'
	                                    });
	                                    PluginService.scenario.sitFlowInputApi.transformProtoData = cell.TransformList;
	                                    PluginService.scenario.sitFlowInputApi.transformVertexId = _.clone(cell.Id);
	                                    $log.debug("[click] executed for cell " + cell.Id);
	                                }

	                            } else if (typeof cell.ContextMenu[index].onClick === 'function') {
	                                cell.ContextMenu[index].onClick(cell, cell.ContextMenu[index].name);
	                            }
	                        }
	                    });
	                    var rb = SVGSelectorService.GetConfigButton(cell.Id);
	                    rb.transition().duration(300).style("opacity", 0);
	                    $log.debug("[click] executed for cell " + cell.Id);
	                });
	                $log.debug("[AttachRenameEvent] executed for cell " + cell.Id);
	            });
	        };
	    };

	    return ContextMenuService;
	}]);

})();

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.DragDropService",
            function () {
                this.dragDrop = function (el) {
                    DragDropTouch._instance = new DragDropTouch();
                    DragDropTouch._ISPRESSHOLDMODE = false; // decides of press & hold mode presence
                    DragDropTouch._PRESSHOLDAWAIT = 400; // ms to wait before press & hold is detected
                    DragDropTouch._rmvAtts = 'id,class,style,draggable'.split(',');
                    DragDropTouch._keybordbdProps = 'altKey,ctrlKey,metaKey,shiftKey'.split(',');
                    DragDropTouch._pointertProps = 'pageX,pageY,clientX,clientY,screenX,screenY'.split(',');

                    function DataTransfer() {
                        this.dropEffect = 'move';
                        this.effectAllowed = 'all';
                        var _data = {};
                        this.getData = function (type) {
                            return _data[type] || '';
                        };
                        this.setData = function (type, value) {
                            _data[type] = value;
                        };
                    }

                    function DragDropTouch() {
                        var dragSource = null;
                        var lastTouch = null;
                        var lastTarget = null;
                        var isDragEnabled = false;
                        var isDropZone = false;
                        var dataTransfer = new DataTransfer();

                        (function activate(_that) {
                            var options = { passive: false, capture: false };
                            el.addEventListener('touchstart', touchstart.bind(_that), options);
                            el.addEventListener('touchmove', touchmove.bind(_that), options);
                            el.addEventListener('touchend', touchend.bind(_that));
                            el.addEventListener('touchcancel', touchend.bind(_that));
                        })(this);

                        function touchstart(e) {
                            //var _this = this;
                            reset();
                            var src = closestDraggable(e.target);
                            if (src) {
                                if (!dispatchEvent(e, 'mousemove', e.target) &&
                                    !dispatchEvent(e, 'mousedown', e.target)) {
                                    dragSource = src;
                                    lastTouch = e;
                                    e.preventDefault();
                                    if (DragDropTouch._ISPRESSHOLDMODE) {
                                        var pressHoldInterval = window.setTimeout(function () {
                                            isDragEnabled = true;
                                            touchmove(e);
                                        }, DragDropTouch._PRESSHOLDAWAIT);
                                    }
                                }
                            }
                        }
                        function touchmove(e) {

                            var target = getTarget(e);
                            if (dispatchEvent(e, 'mousemove', target)) {
                                lastTouch = e;
                                e.preventDefault();
                                return;
                            }

                            if (dragSource) {
                                dispatchEvent(e, 'dragstart', dragSource);
                                dispatchEvent(e, 'dragenter', target);
                            }
                            lastTouch = e;
                            e.preventDefault(); // prevent scrolling
                            if (target != lastTarget) {
                                dispatchEvent(lastTouch, 'dragleave', lastTarget);
                                dispatchEvent(e, 'dragenter', target);
                                lastTarget = target;
                            }
                            isDropZone = dispatchEvent(e, 'dragover', target);
                        }
                        function touchend(e) {
                            if (dispatchEvent(lastTouch, 'mouseup', e.target)) {
                                e.preventDefault();
                                return;
                            }
                            if (dragSource) {
                                if (e.type.indexOf('cancel') < 0 && isDropZone) {
                                    dispatchEvent(lastTouch, 'drop', lastTarget);
                                }
                                dispatchEvent(lastTouch, 'dragend', dragSource);
                                reset();
                            }
                        }
                        function reset() {
                            dragSource = null;
                            lastTouch = null;
                            lastTarget = null;
                            isDragEnabled = false;
                            isDropZone = false;
                            dataTransfer = new DataTransfer();
                        }
                        function getPoint(e, page) {
                            e && e.touches && (e = e.touches[0]);
                            return {
                                x: page ? e.pageX : e.clientX,
                                y: page ? e.pageY : e.clientY
                            };
                        }
                        function getTarget(e) {
                            var pt = getPoint(e);
                            var el = document.elementFromPoint(pt.x, pt.y);
                            while (el && getComputedStyle(el).pointerEvents == 'none') {
                                el = el.parentElement;
                            }
                            return el;
                        }
                        function copyProps(dst, src, props) {
                            for (var i = 0; i < props.length; i++) {
                                var p = props[i];
                                dst[p] = src[p];
                            }
                        }
                        function copyStyle(src, dst) {
                            DragDropTouch._rmvAtts.forEach(function (att) { dst.removeAttribute(att) });
                            var cs = getComputedStyle(src);
                            for (var i = 0; i < cs.length; i++) {
                                var key = cs[i];
                                if (key.indexOf('transition') < 0) {
                                    dst.style[key] = cs[key];
                                }
                            }
                            dst.style.pointerEvents = 'none';
                            for (var j = 0; j < src.children.length; j++) {
                                copyStyle(src.children[j], dst.children[j]);
                            }
                        }
                        function dispatchEvent(e, type, target) {
                            if (e && target) {
                                var evt = document.createEvent('Event'), t = e.touches ? e.touches[0] : e;
                                evt.initEvent(type, true, true);
                                evt.button = 0;
                                evt.which = evt.buttons = 1;
                                copyProps(evt, e, DragDropTouch._keybordbdProps);
                                copyProps(evt, t, DragDropTouch._pointertProps);
                                evt.dataTransfer = dataTransfer;
                                target.dispatchEvent(evt);
                                return evt.defaultPrevented;
                            }
                            return false;
                        }
                        function closestDraggable(element) {
                            while (element) {
                                if (element.hasAttribute('draggable') && element.draggable) {
                                    return element;
                                }
                                element = element.parentElement
                            }
                            return null;
                        }
                    }
                };
            });

}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.GeometryService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
	function ($log, FlowConstants) {

	    this.flowConstants = FlowConstants;

	    this.GetOuterCorners = function(cell)
	    {
	        var out = new Object();
	        out.TopLeft = { x: cell.X, y: cell.Y };
	        out.TopRight = { x: cell.X + cell.Width, y: cell.Y };
	        out.BottomLeft = { x: cell.X, y: cell.Y  + cell.Height};
	        out.BottomRight = { x: cell.X + cell.Width , y: cell.Y + cell.Height };
	        return out;
	    }

	    this.GetInnerCorners = function (cell)
	    {
	        var out = new Object();
	        out.TopLeft = { x: cell.X + this.flowConstants.selectionRectGap, y: cell.Y + this.flowConstants.selectionRectGap };
	        out.TopRight = { x: cell.X + cell.Width - this.flowConstants.selectionRectGap, y: cell.Y+this.flowConstants.selectionRectGap };
	        out.BottomLeft = { x: cell.X + this.flowConstants.selectionRectGap, y: cell.Y - this.flowConstants.selectionRectGap + cell.Height };
	        out.BottomRight = { x: cell.X + cell.Width - this.flowConstants.selectionRectGap, y: cell.Y - this.flowConstants.selectionRectGap + cell.Height };
	        return out;
	    }

	    this.GetOuterMiddlePoints = function (cell) {
	        var out = new Object();
	        out.Top = { x: cell.X + (cell.Width / 2), y: cell.Y};
	        out.Bottom = { x: cell.X + (cell.Width / 2), y: cell.Y+cell.Height };
	        out.Left= { x: cell.X , y: cell.Y +(cell.Height/2)};
	        out.Right = { x: cell.X + cell.Width , y: cell.Y + (cell.Height / 2) };
	        return out;
	    }

	    this.GetInnerMiddlePoints = function (cell) {
	        var out = new Object();
	        out.Top = { x: cell.X + (cell.Width / 2), y: cell.Y  };
	        out.Bottom = { x: cell.X + (cell.Width / 2), y: cell.Y + cell.Height  };
	        out.Left = { x: cell.X , y: cell.Y + (cell.Height / 2) };
	        out.Right = { x: cell.X + cell.Width, y: cell.Y + (cell.Height / 2) };
	        return out;
	    }

	    this.GetPoints = function (cell)
	    {
	        var out = new Object();
	        out.OuterCorners = this.GetOuterCorners(cell);
	        out.InnerCorners = this.GetInnerCorners(cell);
	        out.OuterMiddles = this.GetOuterMiddlePoints(cell);
	        out.InnerMiddles = this.GetInnerMiddlePoints(cell);
	        out.Middle = { x: cell.X + cell.Width / 2, y: cell.Y + cell.Height / 2 };
	        return out;
	    }

	    this.pointOnRect = function(x, y, minX, minY, maxX, maxY, check) {
	        //assert minX <= maxX;
	        //assert minY <= maxY;
	        if (check && (minX <= x && x <= maxX) && (minY <= y && y <= maxY))
	            throw "Point " + [x, y] + "cannot be inside "
                    + "the rectangle: " + [minY, minY] + " - " + [maxX, maxY] + ".";
	        var midX = (minX + maxX) / 2;
	        var midY = (minY + maxY) / 2;
	        // if (midX - x == 0) -> m == ±Inf -> minYx/maxYx == x (because value / ±Inf = ±0)
	        var m = (midY - y) / (midX - x);

	        if (x <= midX) { // check "left" side
	            var minXy = m * (minX - x) + y;
	            if (minY < minXy && minXy < maxY)
	                return { x: minX, y: minXy };
	        }

	        if (x >= midX) { // check "right" side
	            var maxXy = m * (maxX - x) + y;
	            if (minY < maxXy && maxXy < maxY)
	                return { x: maxX, y: maxXy };
	        }

	        if (y <= midY) { // check "top" side
	            var minYx = (minY - y) / m + x;
	            if (minX < minYx && minYx < maxX)
	                return { x: minYx, y: minY };
	        }

	        if (y >= midY) { // check "bottom" side
	            var maxYx = (maxY - y) / m + x;
	            if (minX < maxYx && maxYx < maxX)
	                return { x: maxYx, y: maxY };
	        }

	    }

	    this.rounded_rect = function(x, y, w, h, r, tl, tr, bl, br) {
	        var retval;
	        retval = "M" + (x + r) + "," + y;
	        retval += "h" + (w - 2 * r);
	        if (tr) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r; }
	        else { retval += "h" + r; retval += "v" + r; }
	        retval += "v" + (h - 2 * r);
	        if (br) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r; }
	        else { retval += "v" + r; retval += "h" + -r; }
	        retval += "h" + (2 * r - w);
	        if (bl) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r; }
	        else { retval += "h" + -r; retval += "v" + -r; }
	        retval += "v" + (2 * r - h);
	        if (tl) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r; }
	        else { retval += "v" + -r; retval += "h" + r; }
	        retval += "z";
	        return retval;
	    }

	}]);
}());




(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.GraphCanvasService", [
    "$log",
    "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
    "siemens.simaticit.common.widgets.flowEditor.services.GraphService",
    "siemens.simaticit.common.widgets.flowEditor.services.SelectionService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGPlaceholderService",
    "siemens.simaticit.common.widgets.flowEditor.model.Vertex",
    "siemens.simaticit.common.widgets.flowEditor.model.Edge",
    "siemens.simaticit.common.widgets.flowEditor.services.ToolsService",
    "siemens.simaticit.common.widgets.flowEditor.services.ResizeService",
    "siemens.simaticit.common.widgets.flowEditor.services.MoveService",
    "siemens.simaticit.common.widgets.flowEditor.services.GroupSelectionService", //FMA
    "siemens.simaticit.common.widgets.flowEditor.services.MouseOverService",
    "siemens.simaticit.common.widgets.flowEditor.services.ClickService",
    "siemens.simaticit.common.widgets.flowEditor.services.AnchorService",
    "siemens.simaticit.common.widgets.flowEditor.services.PanZoomService",
    "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGDebugService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGGridService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGContextMenuService",
    'siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants',
    'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
    "siemens.simaticit.common.widgets.flowEditor.services.ContextMenuService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGIconService",
    "siemens.simaticit.common.widgets.flowEditor.services.SVGLabelService",
    "siemens.simaticit.common.widgets.flowEditor.services.IconService",

	function (
    $log,
    PluginService,
    GraphService,
    SelectionService,
    SVGPlaceholderService,
    Vertex,
    Edge,
    ToolsService,
	ResizeService,
    MoveService,
    GroupSelectionService,
    MouseOverService,
    ClickService,
    AnchorService,
    PanZoomService,
    SharingService,
    SVGSelectorService,
    SVGAnchorService,
    SVGDebugService,
    SVGGridService,
    SVGContextMenuService,
    FlowConstants,
    FlowIdPrefixes,
    ContextMenuService,
    SVGIconService,
    SVGLabelService,
    IconService) {
	    if (!String.prototype.startsWith) {
	        String.prototype.startsWith = function (searchString, position) {
	            position = position || 0;
	            return this.substr(position, searchString.length) === searchString;
	        };
	    }


	    var GraphCanvasService = function (scope, onSelectionChanged, onUndoRedoChanged, connectAndClone) {

	        var vertexes = PluginService.GetVertexes();
			// calculates the initial height and width of the graph
			FlowConstants.initialHeight = $('#graphContainer').height() * 6;
			FlowConstants.initialWidth = $('#graphContainer').width() * 6;

	        var svg = SVGSelectorService.GetSVG(scope.graphId)
                        .attr({
                            "width": FlowConstants.initialWidth,
                            "height": FlowConstants.initialHeight
                        });
	        svg.append("g")
                    .attr({
                        "id": FlowIdPrefixes.grid + scope.graphId
                    });
	        svg.append("g")
                    .attr({
                        "id": FlowIdPrefixes.canvas + scope.graphId
                    })
                /////////PLACEHOLDER FOR INSERT EDGES
                .append("g")
                .attr({
                    "id": FlowIdPrefixes.after
                });


	        var mainCanvas = SVGSelectorService.GetMainCanvas(scope.graphId);
	        svg = SVGSelectorService.GetSVG(scope.graphId);
	        var selectionService = new SelectionService(scope, onSelectionChanged);
	        var mouseOver;
            var graphService;
            var tools;
            var pzService;
            var resizeManager;
            var movementManager;
            var anchorManager;
            var mouseOverManager;
            var clickManager;
            var contextManager;
            var iconManager;
            var groupSelectionManager;

	        svg.on("mouseenter", function () {
	            mouseOver = true;
	        });

	        svg.on("mouseleave", function () {
	            mouseOver = false;
	        });

	        this.SelectCells = function (cells) {
	            selectionService.SetSelected(cells);
	        }

	        this.ClearSelection = function () {
	            tools.ClearSelection();
	        }

	        this.ToggleGrid = function () {
	            tools.ShowGrid = !tools.ShowGrid;
	            if (tools.ShowGrid)
	                SVGGridService.AddGrid(scope.graphId, pzService.GetScale());
	            else
	                SVGGridService.RemoveGrid(scope.graphId, pzService.GetScale());
	        };

	        this.TogglePan = function () {
	            tools.ShowPan = !tools.ShowPan;
	            if (tools.ShowPan)
	                pzService.AddPan(scope.graphId);
	            else
	                pzService.RemovePan(scope.graphId);
	        };

	        this.ToggleReadOnly = function () {
	            graphService.IsReadOnly = !graphService.IsReadOnly;
	        };

	        this.ToggleLock = function () {
	            tools.ShowPan = !tools.ShowPan;
	            if (tools.ShowPan)
	                pzService.AddPan(scope.graphId);
	            else
	                pzService.RemovePan(scope.graphId);
	            graphService.IsReadOnly = tools.ShowPan;
	        }



	        this.ToggleSnap = function () {
	            tools.SnapToGrid = !tools.SnapToGrid;
	        };

	        this.CanUndo = function () {
	            return graphService.UndoRedoService.CanUndo();
	        };

	        this.CanRedo = function () {
	            return graphService.UndoRedoService.CanRedo();
	        };

	        this.ZoomIn = function () {
	            pzService.ZoomIn();
	        };

	        this.ZoomOut = function () {
	            pzService.ZoomOut();
	        };

	        this.ZoomReset = function () {
	            pzService.ZoomReset();
	        };

	        this.ZoomFit = function () {
	            pzService.ZoomFit(graphService);
	        };

	        this.ClearUndoRedo = function () {
	            graphService.UndoRedoService.Clear();
	        }

	        this.Undo = function (force) {
	            if (mouseOver || force)
	                return graphService.UndoRedoService.Undo();
	        };

	        this.Redo = function (force) {
	            if (mouseOver || force)
	                return graphService.UndoRedoService.Redo();
	        };

	        this.IsReadOnly = function () {
	            return graphService.IsReadOnly;
	        };

	        this.DisableMultiSelect = function () {
	            graphService.IsMultiSelectable = false;
	        }

	        this.EnableMultiSelect = function () {
	            graphService.IsMultiSelectable = true;
	        }

	        this.GetGraphService = function () {
	            return graphService;
	        };

	        this.RemoveCell = function (cell) {
	            tools.ClearSelection();
	            if (cell instanceof Vertex)
	                PluginService.RemoveVertex(graphService, cell);
	            else
	                PluginService.RemoveEdge(graphService, cell);

	        };


	        //FMA depth control
	        var refreshCells = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                SVGSelectorService.MoveOnTop(cell, mainCanvas);
	                if (cell.CanHaveChildren) {
	                    refreshCells(cell.Children);
	                }
	            }
	        }
	        this.BringCellsToFront = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell instanceof Vertex) {
	                    graphService.BringModelCellsToFront(cell);
	                    if (cell.Parent) {
	                        refreshCells(cell.Parent.Children);
	                    }
	                }
	            }
	            refreshCells(graphService.Cells);
	        };
	        this.SendCellsToBack = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell instanceof Vertex) {
	                    graphService.SendModelCellsToBack(cell);
	                    if (cell.Parent) {
	                        refreshCells(cell.Parent.Children);
	                    }
	                }
	            }
	            refreshCells(graphService.Cells);
	        };
	        this.BringCellsForward = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell instanceof Vertex) {
	                    graphService.BringModelCellsForward(cell);
	                    if (cell.Parent) {
	                        refreshCells(cell.Parent.Children);
	                    }
	                }
	            }
	            refreshCells(graphService.Cells);
	        };
	        this.SendCellsBackward = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell instanceof Vertex) {
	                    graphService.SendModelCellsBackward(cell);
	                    if (cell.Parent) {
	                        refreshCells(cell.Parent.Children);
	                    }
	                }
	            }
	            refreshCells(graphService.Cells);
	        };

	        //---  FMA  ----------------------------------
	        this.RemoveMultipleCells = function (cells) {
	            tools.ClearSelection();
	            var vertexes = [];
	            var edges = [];
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell instanceof Vertex)
	                    vertexes.push(cell);
	                else
	                    edges.push(cell);
	            }
	            if (vertexes.length == 1)
	                PluginService.RemoveVertex(graphService, vertexes[0]);
	            if (edges.length == 1)
	                PluginService.RemoveEdge(graphService, edges[0]);

	            if (vertexes.length > 1)
	                PluginService.RemoveMultipleVertex(graphService, vertexes);
	            if (edges.length > 1);
	        };
	        //--------------------------------------------

	        //---  FMA  ----------------------------------
	        this.EditCells = function (cells) {
	            var vertexes = [];
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];

	                if (cell instanceof Vertex)
	                    vertexes.push(cell);
	                else
	                    PluginService.EditEdge(graphService, cell);
	            }
	            if (cells.length == 1)
	                PluginService.EditVertex(graphService, cells[0]);
	            else
	                PluginService.EditMultipleVertex(graphService, vertexes);
	        };
	        //--------------------------------------------

	        this.EditCell = function (cell) {
	            if (cell instanceof Vertex)
	                PluginService.EditVertex(graphService, cell);
	            else
	                PluginService.EditEdge(graphService, cell);

	        };

	        this.UpdateCell = function (cell) {
	            graphService.UpdateCell(cell);
	        };

	        this.GetCells = function () {
	            return graphService.Cells;
	        };

	        this.GetSelectedCells = function () {
	            return tools.GetSelectedCells();
	        };

	        //FMA
	        this.GetAllSelectedCells = function () {
	            return tools.GetAllSelectedCells();
	        };

	        this.Save = function () {
	            PluginService.Save(graphService);
	        };

	        this.Refresh = function () {
	            PluginService.Refresh(graphService);
	        };

	        this.AutoGenerate = function () {
	            PluginService.AutoGenerate(graphService);
	        };

	        this.AutoGenerateAll = function () {
	            PluginService.AutoGenerateAll(graphService);
	        };

	        this.EditSettings = function () {
	            PluginService.EditSettings(graphService);
	        };

	        this.Drop = function (type, x, y, element) {

	            var proto;
	            var v, temp;
	            for (var i = 0; i < vertexes.length; i++) {
	                v = vertexes[i];
	                temp = new v();
	                if (temp.Type == type) {
	                    proto = v;
	                    break;
	                }
	            }

	            var pos = pzService.GetScaledPosition(x, y);


	            var halfW = temp.Width / 2 + FlowConstants.innerPlaceholderGap;
	            var halfH = temp.Height / 2 + FlowConstants.innerPlaceholderGap;
	            var expectedX;
	            var expectedY;
	            if (pos.x - halfW < 0)
	                expectedX = halfW;
	            else
	                expectedX = pos.x;
	            if (pos.y - halfH < 0)
	                expectedY = halfH;
	            else
	                expectedY = pos.y;

	            expectedX = expectedX - temp.Width / 2;
	            expectedY = expectedY - temp.Height / 2;

	            var children = SVGSelectorService.GetCandidateChildren(graphService, expectedX, expectedY, temp.Width, temp.Height);
	            var parent = SVGSelectorService.GetCandidateParent(graphService, expectedX, expectedY, temp.Width, temp.Height);
	            x = parseInt(pos.x, 10);
	            y = parseInt(pos.y, 10);
	            /////////////LEFT / TOP LIMIT
	            if (x < 0)
	                x = 0;
	            if (y < 0)
	                y = 0;
	            /////////////SNAP IF REQUESTED
	            var snapped = tools.SnapOnMove(x, y);
	            var snappedX = snapped[0];
	            var snappedY = snapped[1];
	            if (proto) {
	                PluginService.AddVertex(graphService, snappedX, snappedY, proto, parent, children);
	            }

	            scope.$apply();
	        };

	        this.MoveUp = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                movementManager.moveStart(cell);

	                cell.endX = cell.X - FlowConstants.innerPlaceholderGap;
	                cell.endY = cell.Y - 5 - FlowConstants.innerPlaceholderGap;
	                cell.startX = cell.X;
	                cell.startY = cell.Y;
	                cell.offsetX = 0;
	                cell.offsetY = -5;

	            }
	            movementManager.moveEndwithArrow();

	        }

	        this.MoveDown = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                movementManager.moveStart(cell);

	                cell.endX = cell.X - FlowConstants.innerPlaceholderGap;

	                cell.endY = cell.Y + 5 - FlowConstants.innerPlaceholderGap;

	                if (cell.endY < 5) cell.endY = 5;
	                cell.startX = cell.X;
	                cell.startY = cell.Y;
	                cell.offsetX = 0;
	                cell.offsetY = 5;

	            }
	            movementManager.moveEndwithArrow();
	        }

	        this.MoveLeft = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                movementManager.moveStart(cell);

	                cell.endX = cell.X - 5 - FlowConstants.innerPlaceholderGap;
	                if (cell.endX < 5) cell.endX = 5;
	                cell.endY = cell.Y - FlowConstants.innerPlaceholderGap;
	                cell.startX = cell.X;
	                cell.startY = cell.Y;
	                cell.offsetX = -5;
	                cell.offsetY = 0;

	            }
	            movementManager.moveEndwithArrow();
	        }

	        this.MoveRight = function (cells) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                movementManager.moveStart(cell);

	                cell.endX = cell.X + 5 - FlowConstants.innerPlaceholderGap;
	                cell.endY = cell.Y - FlowConstants.innerPlaceholderGap;
	                cell.startX = cell.X;
	                cell.startY = cell.Y;
	                cell.offsetX = 5;
	                cell.offsetY = 0;

	            }
	            movementManager.moveEndwithArrow();
	        }

	        var afterInit = function (cell) {
	            SVGPlaceholderService.CreatePlaceholder(mainCanvas, cell);
	            if (!graphService.IsReadOnly) {
	                movementManager.AttachDragDropEvents(cell);
	                mouseOverManager.AttachMouseOverEvents(cell);
	                resizeManager.AttachResizeEvent(cell);
	            }

	            PluginService.DrawVertex(cell);

	            if (!graphService.IsReadOnly) {
	                SVGAnchorService.AppendAnchor(cell, scope.isConnectAndClone());
	                SVGContextMenuService.addContextMenuButtons(cell);
	                SVGIconService.addIconButtons(cell);
	                SVGLabelService.addLabel(cell);
	                iconManager.attachIconEvents(cell);
	                anchorManager.AttachAnchorEvents(cell);
	                contextManager.attachContextMenuEvents(cell, graphService, scope);
	            }
	            if (graphService.IsMultiSelectable) {
	                groupSelectionManager.AttachCanvasDragEvents(svg);
	            }
	        }

	        var manageAddedCells = function (addedCells) {

	            for (var i = 0; i < addedCells.length; i++) {
	                var cell = addedCells[i];

	                if (cell instanceof Vertex) {
	                    if (cell.Init)
	                        cell.Init(afterInit);
	                    else
	                        afterInit(cell);

	                }
	                else {

	                    var edge = PluginService.DrawEdge(cell, mainCanvas)
	                    clickManager.AttachEdgeClickEvent(cell);
	                    movementManager.AttachDragDropEventsEdge(cell);
	                    mouseOverManager.AttachMouseOverEventsEdge(cell);
	                    SVGContextMenuService.addContextMenuButtons(cell);
	                    SVGIconService.addIconButtons(cell);
	                    SVGLabelService.addLabel(cell);
	                    iconManager.attachIconEvents(cell);
	                    contextManager.attachContextMenuEvents(cell, graphService, scope);
	                }
	            }

	        };

	        var manageUpdatedCells = function (updatedCells) {
	            for (var i = 0; i < updatedCells.length; i++) {
	                var cell = updatedCells[i];

	                if (cell instanceof Vertex) {
	                    SVGPlaceholderService.CleanPlaceholder(cell);
	                    var ph = SVGSelectorService.GetPlaceholder(cell.Id);
	                    if (ph && ph[0][0] != null) {
	                        ph.html("");
	                        SVGPlaceholderService.UpdatePlaceholder(cell);
	                        PluginService.DrawVertex(cell, ph);
	                        SVGContextMenuService.addContextMenuButtons(cell);
	                        SVGIconService.addIconButtons(cell);
	                        SVGLabelService.addLabel(cell);
	                        iconManager.attachIconEvents(cell);
	                        contextManager.attachContextMenuEvents(cell, graphService, scope);
	                    }

	                }
	                else {
	                    var edge = SVGSelectorService.GetEdge(cell.Id);
	                    var rect = SVGSelectorService.GetSelRect(cell.Id);
	                    var label = SVGSelectorService.GetSelEdgeLabel(cell.Id);
	                    var token = SVGSelectorService.GetSelEdgeToken(cell.Id);
	                    var ewp = SVGSelectorService.GetEdgeWaypoints(cell.Id);
	                    label.remove(label);
	                    edge.remove(edge);
	                    rect.remove(rect);
	                    token.remove(token);
	                    ewp.remove(ewp);
	                    edge.html("");
	                    var rp = SVGSelectorService.GetEdgeRoutePoints(cell.Id);
	                    rp.remove(rp);
	                    edge = PluginService.DrawEdge(cell, mainCanvas);
	                    clickManager.AttachEdgeClickEvent(cell);
	                    movementManager.AttachDragDropEventsEdge(cell);
	                    mouseOverManager.AttachMouseOverEventsEdge(cell);
	                    SVGContextMenuService.addContextMenuButtons(cell);
	                    SVGIconService.addIconButtons(cell);
	                    SVGLabelService.addLabel(cell);
	                    iconManager.attachIconEvents(cell);
	                    contextManager.attachContextMenuEvents(cell, graphService, scope);
	                    if (cell.IsSelected) {
	                        cell.IsSelected = false;
	                        selectionService.SetSelected([cell]);
	                    }
	                }
	            }

	        };

	        var manageRemovedCells = function (removedCells) {
	            var ph;
	            for (var i = 0; i < removedCells.length; i++) {
	                var cell = removedCells[i];

	                if (cell instanceof Vertex) {
	                    ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
	                    if (SharingService.Debug) {
	                        SVGDebugService.RemoveDebugElements(cell);
	                    }
	                    ph.remove();
	                }
	                else {
	                    ph = SVGSelectorService.GetEdge(cell.Id);
	                    var routePoints = SVGSelectorService.GetEdgeRoutePoints(cell.Id);
	                    var r = SVGSelectorService.GetSelRect(cell.Id);
	                    r.remove(r);

	                    var ewp = SVGSelectorService.GetEdgeWaypoints(cell.Id);
	                    ewp.remove(ewp);

	                    var label = SVGSelectorService.GetSelEdgeLabel(cell.Id)
	                    label.remove(label);
	                    var token = SVGSelectorService.GetSelEdgeToken(cell.Id)
	                    token.remove(token);
	                    routePoints.remove();
	                    ph.remove();
	                }
	            }
	        };

	        var updateGraph = function (addedCells, updatedCells, removedCells) {

	            manageAddedCells(addedCells);
	            manageUpdatedCells(updatedCells);
	            manageRemovedCells(removedCells);
	        };

	        graphService = new GraphService(scope, updateGraph, mainCanvas, onUndoRedoChanged);
	        tools = new ToolsService(graphService, selectionService, mainCanvas, scope);
	        pzService = new PanZoomService(graphService, mainCanvas, scope, tools);
	        resizeManager = new ResizeService(graphService, mainCanvas, tools);
	        movementManager = new MoveService(graphService, mainCanvas, tools, pzService);
	        anchorManager = new AnchorService(graphService, mainCanvas, scope, connectAndClone);
	        mouseOverManager = new MouseOverService(graphService, resizeManager, movementManager, anchorManager, mainCanvas);
	        clickManager = new ClickService(graphService, SVGSelectorService.GetSVG(scope.graphId), tools, scope, pzService);
	        contextManager = new ContextMenuService(graphService, SVGSelectorService.GetSVG(scope.graphId), tools, scope);
	        iconManager = new IconService(graphService, SVGSelectorService.GetSVG(scope.graphId), tools, scope);
	        groupSelectionManager = new GroupSelectionService(graphService, SVGSelectorService.GetSVG(scope.graphId), tools, resizeManager, pzService, PluginService, movementManager);

	        //FMA following commented
	        clickManager.AttachClickOnCanvas();
	        if (tools.ShowGrid)
	            SVGGridService.AddGrid(scope.graphId);
	    };

	    return GraphCanvasService;

	}]);
}());


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.GraphService", ["$log",
            "siemens.simaticit.common.widgets.flowEditor.services.UndoRedoService",
	function ($log, UndoRedoService) {

	    var GraphService = function (scope, updateGraph, mainCanvas, onUndoRedoChanged) {

	        var sessionStarted;
	        var addedCells;
	        var updatedCells;
	        var removedCells;
	        var searched;

	        function checkId(cells, cell) {
	            if (cell.Id == null) {
	                $log.error("The cell has a NULL Id!!!");
	                return false;
	            }
	            if (exists(cells, cell.Id)) {
	                $log.error("The id " + cell.Id + " is duplicated!!!");
	                return false;
	            }

	            return true;
	        }

	        function removeCell(cells, cell) {
	            var index = -1;
	            var cellId = cell.Id;
	            for (var i = 0; i < cells.length; i++) {
	                if (cells[i].Id === cellId) {
	                    index = i;
	                }
	            }
	            if (index > -1) {
	                cells.splice(index, 1);
	            }
	        }

	        function recurseGetCells(cells) {
	            var locCells = cells;
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell.CanHaveChildren && cell.Children != null && cell.Children.length > 0) {
	                    var newCells = recurseGetCells(cell.Children);
	                    locCells = locCells.concat(newCells);
	                }

	            }
	            return locCells;
	        }

	        function exists(cells, id) {
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (cell.Id === id) {
	                    return true;
	                }
	            }
	        }

	        function findCell(list, id) {
	            for (var i = 0; i < list.length; i++) {
	                var cell = list[i];
	                if (cell.Id == id) {
	                    searched = cell;
	                    break;
	                }
	                else if (cell.CanHaveChildren) {
	                    findCell(cell.Children, id);
	                }
	            }
	        }

	        function recurseRemove(cell) {
	            removedCells.push(cell);
	            if (cell.CanHaveChildren) {
	                for (var i = 0; i < cell.Children.length; i++) {
	                    var child = cell.Children[i];
	                    recurseRemove(child);
	                }
	            }
	        }

	        this.MainCanvas = mainCanvas;
	        this.UndoRedoService = new UndoRedoService(scope.$parent, onUndoRedoChanged);
	        this.GraphId = scope.graphId;
	        this.PhaseId = scope.phaseId;
	        this.Cells = new Array();
	        this.IsReadOnly = false;
	        this.IsMultiSelectable = true;

	        this.Configurations = new Array();

	        this.addChildren = function (list, parent) {
	            for (var i = 0; i < list.length; i++) {
	                var edge;
	                var child = list[i];
	                if (parent)
	                    child.Parent = parent;

	                addedCells.push(child);
	                for (var j = 0; j < child.Incoming.length; j++) {
	                    edge = child.Incoming[j];

	                    edge.Source.Outgoing.push(edge);
	                    addedCells.push(edge);
	                    this.Cells.push(edge);
	                }

	                for (var o = 0; o < child.Outgoing.length; o++) {
	                    edge = child.Outgoing[o];

	                    edge.Target.Incoming.push(edge);
	                    addedCells.push(edge);
	                    this.Cells.push(edge);
	                }
	                if (child.CanHaveChildren)
	                    this.addChildren(child.Children, child);
	            }
	        };

	        this.GetCellById = function (id) {
	            searched = null;
	            findCell(this.Cells, id);
	            return searched;
	        };

	        this.StartSession = function () {
	            addedCells = new Array();
	            updatedCells = new Array();
	            removedCells = new Array();
	            sessionStarted = true;
	        };

	        this.EndSession = function () {
	            sessionStarted = false;
	            updateGraph(addedCells, updatedCells, removedCells);
	        };

	        this.AddCell = function (cell, parent, manual) {
	            if (!checkId(this.Cells, cell))
	                return;

	            if (manual == null || !manual)
	                this.StartSession();
	            cell.GraphService = this;

	            var config = this.Configurations.filter(function (c) { return c.VertexType == cell.Type })[0];
	            if (config) {
	                cell.Font = { Size: config.Font.Size, Italic: config.Font.Italic, Bold: config.Font.Bold };
	            }
	            addedCells.push(cell);
	            if (parent) {
	                cell.Parent = parent;
	                parent.Children.push(cell);
	            }
	            else {
	                this.Cells.push(cell);
	            }

	            if (cell.CanHaveChildren)
	                this.addChildren(cell.Children, cell);

	            if (manual == null || !manual)
	                this.EndSession();
	        };

	        this.RemoveCell = function (cell, manual) {
	            if (manual == null || !manual)
	                this.StartSession();
	            removedCells.push(cell);
	            if (cell.Parent) {
	                removeCell(cell.Parent.Children, cell);
	                cell.Parent = null;
	            } else {
	                removeCell(this.Cells, cell);
	            }
	            if (manual == null || !manual)
	                this.EndSession();
	        };

	        this.UpdateSolutionAreaVertexesRecursive = function (vertex, dx) {
	            this.StartSession();
	            vertex.X += dx;
	            updatedCells.push(vertex);
	            this.EndSession();
	            if (vertex.CanHaveChildren && vertex.Children != null) {
	                for (var i = 0; i < vertex.Children.length; i++) {
	                    var child = vertex.Children[i];
	                    this.UpdateSolutionAreaVertexesRecursive(child, dx);
	                }
	            }
	        };

	        this.UpdateSolutionAreaEdgesRecursive = function (vertex, dx, last) {
	            var i;
	            this.StartSession();
	            for (i = 0; i < vertex.Outgoing.length; i++) {
	                var elbow = vertex.Outgoing[i];
	                for (var j = 0; j < elbow.Route.length; j++) {
	                    if (!((elbow.Type == "domainEdge") && (j == (elbow.Route.length - 1))) || last) {
	                        elbow.Route[j].x += dx;
	                    }
	                }
	                this.UpdateCell(elbow);
	            }
	            this.EndSession();
	            if (vertex.CanHaveChildren && vertex.Children != null) {
	                for (i = 0; i < vertex.Children.length; i++) {
	                    var child = vertex.Children[i];
	                    this.UpdateSolutionAreaEdgesRecursive(child, dx, last);
	                }
	            }
	        };

	        this.UpdateSolutionArea = function (solutionArea, dx, last) {
	            this.UpdateSolutionAreaVertexesRecursive(solutionArea, dx);
	            this.UpdateSolutionAreaEdgesRecursive(solutionArea, dx, last);
	        };

	        this.UpdateCellPositionRecursive = function (vertex, dx, dy, startEdge, manual) {
	            var i;
	            if (manual == null || !manual) {
	                this.StartSession();
	            }
	            vertex.X += dx;
	            vertex.Y += dy;
	            for (i = 0; i < vertex.Outgoing.length; i++) {
	                var elbow = vertex.Outgoing[i];
	                for (var j = 0; j < elbow.Route.length - 1; j++) {
	                    elbow.Route[j].x += dx;
	                    elbow.Route[j].y += dy;
	                }
	                if (startEdge) {
	                    elbow.Route[elbow.Route.length - 1].x += dx;
	                    elbow.Route[elbow.Route.length - 1].y += dy;

	                }
	                this.UpdateCell(elbow);
	            }

	            updatedCells.push(vertex);
	            if (manual == null || !manual)
	                this.EndSession();
	            if (vertex.CanHaveChildren && vertex.Children != null) {
	                for (i = 0; i < vertex.Children.length; i++) {
	                    var child = vertex.Children[i];
	                    this.UpdateCellPositionRecursive(child, dx, dy, startEdge, manual);
	                }
	            }
	        };

	        this.UpdateCell = function (vertex, manual) {
	            if (manual == null || !manual) {
	                this.StartSession();
	            }
	            updatedCells.push(vertex);
	            if (manual == null || !manual) {
	                this.EndSession();
	            }
	        };

	        this.UpdateCells = function (cells, manual) {
	            if (manual == null || !manual) {
	                this.StartSession();
	            }
	            for (var i = 0; i < cells.length; i++) {
	                if (cells[i]) {
	                    updatedCells.push(cells[i]);
	                }
	            }
	            if (manual == null || !manual) {
	                this.EndSession();
	            }
	        };

	        this.UpdateVertex = function (vertex, parent, manual) {
	            if (manual == null || !manual) {
	                this.StartSession();
	            }
	            this.UpdateCell(vertex, true);
	            if (vertex.Incoming) {
	                this.UpdateCells(vertex.Incoming, true);
	            }
	            if (vertex.Outgoing) {
	                this.UpdateCells(vertex.Outgoing, true);
	            }
	            if (parent != vertex.Parent) {
	                if (parent && vertex.Parent == null) {
	                    removeCell(this.Cells, vertex);
	                    parent.Children.push(vertex);
	                }
	                if (parent == null && vertex.Parent) {
	                    this.Cells.push(vertex)
	                    removeCell(vertex.Parent.Children, vertex);
	                }
	                if (parent && vertex.Parent) {
	                    removeCell(vertex.Parent.Children, vertex);
	                    parent.Children.push(vertex);
	                }
	                vertex.Parent = parent;
	            }
	            if (vertex.CanHaveChildren && vertex.Children != null) {
	                for (var i = 0; i < vertex.Children.length; i++) {
	                    var child = vertex.Children[i];
	                    this.UpdateVertex(child, child.Parent, true);
	                }
	            }
	            if (manual == null || !manual) {
	                this.EndSession();
	            }
	        };

	        this.RemoveVertex = function (cell, manual) {
	            var edge;
	            if (manual == null || !manual) {
	                this.StartSession();
	            }
	            removedCells.push(cell);
	            if (cell.Parent) {
	                removeCell(cell.Parent.Children, cell);
	                cell.Parent = null;
	            } else {
	                removeCell(this.Cells, cell);
	            }
	            for (var i = 0; i < cell.Incoming.length; i++) {
	                edge = cell.Incoming[i];
	                removedCells.push(edge);
	                if (edge.OnRemove) {
	                    edge.OnRemove();
	                }
	                removeCell(this.Cells, edge);
	                removeCell(edge.Source.Outgoing, edge);
	            }

	            for (i = 0; i < cell.Outgoing.length; i++) {
	                edge = cell.Outgoing[i];
	                removedCells.push(edge);
	                if (edge.OnRemove) {
	                    edge.OnRemove();
	                }
	                removeCell(this.Cells, edge);
	                removeCell(edge.Target.Incoming, edge);
	            }

	            if (cell.CanHaveChildren) {
	                for (i = 0; i < cell.Children.length; i++) {
	                    var child = cell.Children[i];
	                    child.Parent = null;
	                    this.RemoveVertex(child, true);
	                }
	            }

	            if (manual == null || !manual) {
	                this.EndSession();
	            }
	        };

	        this.AddEdge = function (edge, source, target, manual, points) {
	            if (!checkId(this.Cells, edge)) {
	                return;
	            }

	            if (manual == null || !manual) {
	                this.StartSession();
	            }

	            edge.GraphService = this;
	            edge.Source = source;
	            edge.Target = target;


	            if (points) {
	                edge.Points = points;
	            }

	            edge.Source.Outgoing.push(edge);
	            edge.Target.Incoming.push(edge);

	            updatedCells.push(source);
	            updatedCells.push(target);
	            addedCells.push(edge);
	            this.Cells.push(edge);

	            if (manual == null || !manual) {
	                this.EndSession();
	            }
	        };

	        this.RemoveEdge = function (edge, manual) {
	            if (manual == null || !manual) {
	                this.StartSession();
	            }
	            removedCells.push(edge);
	            updatedCells.push(edge.Target);
	            updatedCells.push(edge.Source);
	            if (edge.Target) {
	                removeCell(edge.Target.Incoming, edge);
	            }
	            if (edge.Source) {
	                removeCell(edge.Source.Outgoing, edge);
	            }
	            removeCell(this.Cells, edge);

	            if (manual == null || !manual) {
	                this.EndSession();
	            }
	        };

	        this.Clear = function () {
	            this.StartSession();
	            for (var i = 0; i < this.Cells.length; i++) {
	                recurseRemove(this.Cells[i]);
	            }
	            this.Configurations = [];
	            this.Cells = new Array();
	            this.EndSession();
	        };

	        this.FlattenCells = function () {
	            return recurseGetCells(this.Cells);
	        };

	        this.BringModelCellsToFront = function (cell) {
	        // FMA depth control
	            var cells = [];
	            if (cell.Parent == null) {
	                cells = this.Cells;
	            }
	            else {
	                cells = cell.Parent.Children;
	            }
	            var index = cells.indexOf(cell);
	            if (index > -1) {
	                cells.splice(index, 1);
	            }
	            cells.push(cell);
	        };

	        this.SendModelCellsToBack = function (cell) {
	            var cells = [];
	            if (cell.Parent == null) {
	                cells = this.Cells;
	            }
	            else {
	                cells = cell.Parent.Children;
	            }
	            var index = cells.indexOf(cell);
	            if (index > -1) {
	                cells.splice(index, 1);
	            }
	            cells.unshift(cell);
	        };

	        this.BringModelCellsForward = function (cell) {
	            var cells = [];
	            if (cell.Parent == null) {
	                cells = this.Cells;
	            }
	            else {
	                cells = cell.Parent.Children;
	            }
	            var index = cells.indexOf(cell);
	            if (index > -1) {
	                var el = cells[index];
	                cells.splice(index, 1);
	                cells.splice(index + 1, 0, el);
	            }
	        };

	        this.SendModelCellsBackward = function (cell) {
	            var cells = [];
	            if (cell.Parent == null) {
	                cells = this.Cells;
	            }
	            else {
	                cells = cell.Parent.Children;
	            }
	            var index = cells.indexOf(cell);
	            if (index > -1) {
	                var el = cells[index];
	                cells.splice(index, 1);
	                cells.splice(index - 1, 0, el);
	            }
	        };
	    };
	    return GraphService;
	}]);
}());

(function () {
    'use strict';
    //FMA
    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.GroupSelectionService",
        ["$log", "$rootScope",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGPlaceholderService",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants',
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SelectionService",
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGGhostService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
            'siemens.simaticit.common.widgets.flowEditor.model.Vertex',
	function ($log, $rootScope, SVGPlaceholderService, PluginService, FlowConstants,
        SVGSelectorService, SelectionService, SharingService, FlowIdPrefixes, SVGGhostService, SVGAnchorService, Vertex) {

	    var GroupSelectionService = function (graphService, mainCanvas, tools, resizeManager, pzService, PluginService, movementManager) {

	        var zoom = 1;
	        var tlrn = 4;
	        var selrect;
	        var isDragging = false; //workaround bacause drag behaviour interferes with resizing

	        this.AttachCanvasDragEvents = function (svg) {

	            var IsIn0 = function (v, d) {
	                var ret =
	                (v.X * zoom >= d.x - tlrn) && (v.X * zoom + v.Width * zoom <= d.x + d.width + tlrn) &&
                    (v.Y * zoom >= d.y - tlrn) && (v.Y * zoom + v.Height * zoom <= d.y + d.height + tlrn);
	                return ret;
	            };

	            var IsIn = function (v, d) {
	                if ((d.x < v.X * zoom) && (d.x + d.width < v.X * zoom))
	                    return false;
	                if ((d.x > (v.X + v.Width) * zoom) && (d.x + d.width > (v.X + v.Width) * zoom))
	                    return false;
	                if ((d.y < v.Y * zoom) && (d.y + d.height < v.Y * zoom))
	                    return false;
	                if ((d.y > (v.Y + v.Height) * zoom) && (d.y + d.height > (v.Y + v.Height) * zoom))
	                    return false;
	                return true;
	            };


	            var selectVertexes = function (vertexes, d) {
	                angular.forEach(vertexes, function (v) {
	                    if (v instanceof Vertex) {
	                        if (v.Children)
	                            selectVertexes(v.Children, d);
	                        if (IsIn(v, d)) {
	                            if (!v.IsSelected)
	                                tools.Select(v);
	                        }
	                        else {
	                            if (v.IsSelected)
	                                tools.UnSelect(v);
	                        }
	                    }
	                });
	            };

	            var dragStart = function () {
	                var event = d3.event;
	                if (resizeManager.IsResizing())
	                    return;
	                if (event.target !== event.currentTarget) {
	                    return;
	                }
	                isDragging = true;
	                document.body.style.cursor = "crosshair";
	                if (d3.event.defaultPrevented)
	                    return;
	                zoom = pzService.GetScale();
	                tools.ClearSelection();
	                var p = d3.mouse(this);
	                selrect =
	                svg.append("rect")
	                .attr({
	                    rx: 6,
	                    ry: 6,
	                    class: "selection",
	                    x: p[0],
	                    y: p[1],
	                    width: 0,
	                    height: 0
	                })
	            }

	            var dragMove = function () {
	                if (resizeManager.IsResizing())
	                    return;
	                if (!isDragging)
	                    return;
	                d3.event.preventDefault();
	                var vertexes = graphService.Cells;
	                var s = svg.select("rect.selection");

	                if (!s.empty()) {
	                    document.body.style.cursor = "crosshair";

	                    var p = d3.mouse(this),
	                        d = {
	                            x: parseInt(s.attr("x"), 10),
	                            y: parseInt(s.attr("y"), 10),
	                            width: parseInt(s.attr("width"), 10),
	                            height: parseInt(s.attr("height"), 10)
	                        },
	                        move = {
	                            x: p[0] - d.x,
	                            y: p[1] - d.y
	                        };
	                    if (move.x < 1 || (move.x * 2 < d.width)) {
	                        d.x = p[0];
	                        d.width -= move.x;
	                    } else {
	                        d.width = move.x;
	                    }
	                    if (move.y < 1 || (move.y * 2 < d.height)) {
	                        d.y = p[1];
	                        d.height -= move.y;
	                    } else {
	                        d.height = move.y;
	                    }

	                    if (move.x == 0 && move.y == 0)
	                        return;

	                    if (d.x <= 0) d.x = 0;
	                    if (d.y <= 0) d.y = 0;
	                    if (d.width <= 0) d.width = 0;
	                    if (d.height <= 0) d.height = 0;

	                    s.attr(d);

	                    selectVertexes(vertexes, d);
	                }
	            }
	            var dragEnd = function () {
	                if (isDragging) {
	                    $('#workflow-context-menu').css('display', 'none');
	                    $rootScope.$broadcast('siemens.simaticit.common.widgets.flowEditor.selectionEnd', tools.GetAllSelectedCells());
	                }
	                document.body.style.cursor = "default";
	                svg.select(".selection").remove();
	                isDragging = false;
	            }

	            mainCanvas
	            .on("mousedown", dragStart)
                .on("mousemove", dragMove)
	            .on("mouseup", dragEnd)
                .on("mouseleave", dragEnd)

	        };
	    };

	    return GroupSelectionService;
	}]);

})();

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.IconService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
                "siemens.simaticit.common.widgets.flowEditor.model.Vertex",
    "siemens.simaticit.common.widgets.flowEditor.model.Edge",
	function ($log, FlowConstants, PluginService, SVGSelectorService, Vertex, Edge) {

	    var IconService = function (graphService, mainCanvas, tools, scope) {
	        this.attachIconEvents = function (cell, graphService, scope) {
	            var buttons = SVGSelectorService.getIconButtonList(cell.Id);
	            buttons.forEach(function (button, index) {

	                button.on("click", function (e) {
	                    setTimeout(function () {
	                        if (cell.IconMenu[index].onClick) {
	                            if (typeof cell.IconMenu[index].onClick === 'function') {
	                                cell.IconMenu[index].onClick(cell, cell.IconMenu[index].name);
	                            }
	                        }
	                    });
	                    var rb = SVGSelectorService.GetConfigButton(cell.Id);
	                    rb.transition().duration(300).style("opacity", 0);
	                    $log.debug("[click] executed for cell " + cell.Id);
	                });
	                $log.debug("[AttachRenameEvent] executed for cell " + cell.Id);
	            });
	        };
	    };

	    return IconService;
	}]);

})();

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.MouseOverService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
    function ($log, FlowConstants, PluginService, SVGSelectorService, SVGAnchorService) {
        var MouseOverService = function (graphService, resizeManager, moveManager, anchorManager, mainCanvas) {

            function mouseOut() {
                var id = SVGSelectorService.GetVertexIdFromNode(this);
                var cell = graphService.GetCellById(id);
                SVGAnchorService.HideAnchors(cell);
                var r = SVGSelectorService.GetLinkRect(cell.Id);
                r.transition().duration(100).style("opacity", 0);
                PluginService.CustomMouseOut(cell);
                if (anchorManager.IsLinking()) {
                    PluginService.LinkMouseOut(cell);
                }
                document.body.style.cursor = "auto";
            }

            function mouseOver() {
                var id = SVGSelectorService.GetVertexIdFromNode(this);
                var cell = graphService.GetCellById(id);
                if (!resizeManager.IsResizing() && !moveManager.IsMoving() && !anchorManager.IsLinking()) {
                    if (cell.MaxOut == -1 || (cell.Outgoing && cell.Outgoing.length < cell.MaxOut)) {
                        SVGAnchorService.ShowAnchors(cell);
                    }
                }
                if (anchorManager.IsLinking()) {
                    var maxincheck = cell.MaxIn && cell.MaxIn > cell.Incoming.length || cell.MaxIn == -1;
                    var cl = PluginService.CanLink(graphService, anchorManager.GetStartCell(), cell);
                    PluginService.LinkMouseOver(cell, cl && maxincheck);
                }
                PluginService.CustomMouseOver(cell);
            }

            function attachMouseOutEvent(cell) {
                var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
                var iph = SVGSelectorService.GetVertexInnerPh(cell.Id);
                iph.on("mouseout", function () { document.body.style.cursor = "auto"; });
                ph.on("mouseout", mouseOut);
                $log.debug("[attachMouseOutEvent] executed for cell " + cell.Id);
            }

            function attachMouseOverEvent(cell) {
                var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
                var iph = SVGSelectorService.GetVertexInnerPh(cell.Id);
                //FMA automatic resize
                iph.on("mouseover", function () { document.body.style.cursor = "move"; });
                ph.on("mouseover", mouseOver);
                $log.debug("[attachMouseOverEvent] executed for cell " + cell.Id);
            }

            function attachMouseOutEventEdge(cell) {

                cell.on("mouseout", function () { document.body.style.cursor = "auto"; });

                $log.debug("[attachMouseOverEventEdge] executed for routing point " + cell.Id);
            }

            function attachMouseOverEventEdge(cell) {

                //FMA usability
                var edgewrap = SVGSelectorService.GetEdgeWrapper(cell.Id);
                edgewrap.on("mouseover", function () {
                    document.body.style.cursor = "pointer";
                });
                //-------------
                $log.debug("[attachMouseOutEventEdge] executed for routing point " + cell.Id);
            }

            this.AttachMouseOverEvents = function (cell) {
                attachMouseOutEvent(cell);
                attachMouseOverEvent(cell);
            };

            this.AttachMouseOverEventsEdge = function (cell) {
                var routingPoints = cell.Route;
                for (var i = 0; i < routingPoints.length; i++) {
                    var point = SVGSelectorService.GetEdgeRoutePoints(cell.Id, i);
                    attachMouseOverEventEdge(point);
                    attachMouseOutEventEdge(point);
                }
            }
        };
        return MouseOverService;
    }]);

})();

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.MoveService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGPlaceholderService",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants',
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
              'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
              "siemens.simaticit.common.widgets.flowEditor.services.SVGGhostService",
              "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService", //FMA shortcut
	function ($log, SVGPlaceholderService, PluginService, FlowConstants,
        SVGSelectorService, SharingService, FlowIdPrefixes, SVGGhostService, SVGAnchorService) {

	    var MoveService = function (graphService, mainCanvas, tools, pzService) {

	        var startX;
	        var startY;
	        var startRoute;
	        var endX;
	        var endY;
	        var offsetX;
	        var offsetY;
	        var isMoving = false;
	        var ctrlCopy = false; //FMA shortcut
	        var clipboard = []; //FMA shortcut
	        var copyNumber = 0; //FMA shortcut
	        var childrenOffset = {};
	        var holdStarter = null;
	        // Milliseconds to wait before recognizing a hold
	        var holdDelay = 500;
	        // Indicates the user is currently holding the mouse down
	        var holdActive = false;
	        // shift key
	        var shiftKey = false;

	        function manageVertexHold(cell) {
	            if (!cell.IsSelected) {
	                if (!d3.event.sourceEvent.ctrlKey)
	                    tools.ClearSelection();
	                tools.Select(cell);
	            }
	        }

	        function dragMoveSingleCell(cell) {
	            //FMA automatic resize
	            if ((cell.Type == "domainGrid") || (cell.BigBlockType == 0) || (cell.BigBlockType == 4) || (cell.BigBlockType == 1))
	                return;
	            var id = cell.Id;
	            var ph = SVGSelectorService.GetVertexOuterPh(id);
	            if (ph[0][0] == null) {
	                $log.debug("[dragMoveSingleCell] ph null for cell " + cell.Id + ", type " + cell.Type);
	                return;
	            }
	            var oX = ph.attr("x");
	            var oY = ph.attr("y");
	            var mouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	            if (cell.offsetX == null && cell.offsetY == null) {
	                cell.offsetX = mouse[0] - parseInt(oX, 10);
	                cell.offsetY = mouse[1] - parseInt(oY, 10);
	            }
	            var x = mouse[0] - cell.offsetX;
	            var y = mouse[1] - cell.offsetY;
	            if (x < 0)
	                x = 0;
	            if (y < 0)
	                y = 0;
	            var snapped = tools.SnapOnMove(x, y);
	            cell.endX = snapped[0];
	            cell.endY = snapped[1];
	            var oldX = cell.X;
	            var oldY = cell.Y;

	            if (d3.event.sourceEvent.shiftKey) {
	                if (Math.abs(cell.endX - cell.startX + FlowConstants.innerPlaceholderGap) < Math.abs(cell.endY - cell.startY + FlowConstants.innerPlaceholderGap))
	                    cell.endX = cell.startX - FlowConstants.innerPlaceholderGap;
	                else
	                    cell.endY = cell.startY - FlowConstants.innerPlaceholderGap;
	            }

	            cell.X = cell.endX + FlowConstants.innerPlaceholderGap;
	            cell.Y = cell.endY + FlowConstants.innerPlaceholderGap;
	            if (SharingService.MoveMode == "full") {
	                ph.attr("x", cell.endX);
	                ph.attr("y", cell.endY);
	                if (cell.UpdateEdges)
	                    cell.UpdateEdges(oldX, oldY);
	                tools.UpdateEdges(cell);
	                ph = SVGSelectorService.GetPlaceholder(cell.Id);
	                ph.html("");
	                SVGPlaceholderService.CleanPlaceholder(cell);
	                PluginService.DrawVertex(cell);
	                SVGPlaceholderService.UpdatePlaceholder(cell);
	                CheckAlign(cell);
	                if (cell.CanHaveChildren && cell.Children.length > 0) {
	                    updateChildren(cell, cell.Children);
	                }
	            }
	            else {
	                SVGGhostService.UpdateVertexGhost(cell.X, cell.Y, cell.Width, cell.Height);
	            }
	            document.body.style.cursor = "move";
	            $('#workflow-context-menu').css({ display: 'none' });
	        }

	        function dragMove() {
	            //possible d3 bug or my fault (fma)
	            if ((d3.event.dx == 0) && (d3.event.dy == 0))
	                return;

	            var id = SVGSelectorService.GetVertexIdFromNode(this);
	            var cell = graphService.GetCellById(id);

	            //some initialization here, enhancement to better manage all the use cases related to hold/click
	            if (!isMoving) {
	                isMoving = true;
	                manageVertexHold(cell);
	            }
	            var selectedCells = tools.GetAllSelectedCells();
	            if (cell.Movable == undefined || cell.Movable) {
	                for (var i = 0; i < selectedCells.length; i++) {
	                    if (selectedCells[i].Type != "elbow")
	                        dragMoveSingleCell(selectedCells[i]);
	                }
	            }
	        }

	        function setOpacityRecursive(cell, op) {
	            SVGSelectorService.GetVertexOuterPh(cell.Id).attr("opacity", op);
	            if (cell.Children != null) {
	                for (var i = 0; i < cell.Children.length; i++) {
	                    setOpacityRecursive(cell.Children[i], op);
	                }
	            }
	        }

	        function dragEnd() {
	            var cell;
	            if (!isMoving) {
	                var id = SVGSelectorService.GetVertexIdFromNode(this);
	                cell = graphService.GetCellById(id);
	                if (holdStarter) {
	                    clearTimeout(holdStarter);
	                    manageVertexClick(cell);
	                }
	                else if (holdActive) {
	                    manageVertexHold(cell);
	                    holdActive = false;
	                }
	            }

	            var selectedCells = tools.GetAllSelectedCells();

	            if (selectedCells.length > 0) {
	                var moving = selectedCells[0].startX != selectedCells[0].endX || selectedCells[0].startY != selectedCells[0].endY;
	                for (var i = 0; i < selectedCells.length; i++) {
	                    cell = selectedCells[i];
	                    cell.parent = SVGSelectorService.GetCandidateParentFromCell(graphService, cell);
	                    cell.children = SVGSelectorService.GetCandidateChildrenFromCell(graphService, cell);
	                    //FMA shortcut
	                    if (ctrlCopy) {
	                        setOpacityRecursive(cell, 1);
	                    }
	                }
	                if (graphService.IsMultiSelectable === true) {
	                    if (moving) {
	                        PluginService.MoveMultipleVertex(graphService, selectedCells);
	                    }
	                } else {
	                    PluginService.MoveMultipleVertex(graphService, selectedCells);
	                }
	            }
	            document.body.style.cursor = "auto";
	            if (SharingService.MoveMode == "ghost")
	                SVGGhostService.RemoveVertexGhost();

	            //clean up
	            ctrlCopy = false;
	            clipboard = [];
	            isMoving = false;
	        }

	        function dragStart() {

	            //FMA shortcut US8034
	            holdStarter = setTimeout(function () {
	                holdStarter = null;
	                holdActive = true;
	            }, holdDelay);

	            childrenOffset = {};
	            var id = SVGSelectorService.GetVertexIdFromNode(this);
	            var cell = graphService.GetCellById(id);
	            var selectedCells = tools.GetAllSelectedCells();
	            dragStartSingleCell(cell);
	            for (var i = 0; i < selectedCells.length; i++) {
	                dragStartSingleCell(selectedCells[i]);
	            }
	        }

	        function dragMoveEdge() {
	            var id_tosplit = SVGSelectorService.GetVertexIdFromNode(this);
	            // id is id_index
	            var ids = id_tosplit.split('_');
	            var id = ids[0];
	            var edge = graphService.GetCellById(id);
	            var routingPoints = edge.Route;

	            var index = ids[1];
	            if (index > routingPoints.length - 1)
	                index = routingPoints.length - 1;
	            var router = routingPoints[index];

	            var ph = SVGSelectorService.GetEdgeRoutePoints(ids[0], index);
	            /////////////GET OPH COORDS
	            var oX = ph.attr("x");
	            var oY = ph.attr("y");
	            var mouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	            /////////////SUB VERTEX OFFSET FOR SMOOTH MOVE
	            if (offsetX == null && offsetY == null) {
	                offsetX = mouse[0] - parseInt(oX, 10);
	                offsetY = mouse[1] - parseInt(oY, 10);
	            }
	            var x = mouse[0] - offsetX;
	            var y = mouse[1] - offsetY;
	            /////////////LEFT / TOP LIMIT
	            if (x < 0)
	                x = 0;
	            if (y < 0)
	                y = 0;
	            /////////////SNAP IF REQUESTED

	            var snapped = tools.SnapOnMove(x, y);
	            endX = snapped[0];
	            endY = snapped[1];

	            var limit = false;

	            // if first or last index, update route
	            if (index == 0 || index == routingPoints.length - 1) {
	                edge.UpdateRoute(index, endX, endY);
	                ph.attr("y", endY);
	                ph.attr("x", endX);
	            }
	                // middle points can move only on one axis, according to the quadrant information
	            else {
	                if (router.quadrant == 0) {

	                    ph.attr("y", endY);
	                    router.y = endY;


	                } else {
	                    ph.attr("x", endX);
	                    router.x = endX;
	                }
	                // other middle points may be changed accordingly
	                edge.AdjustRoutingPoints();
	            }
	            // delete edge
	            var e = SVGSelectorService.GetEdge(id);
	            e.remove(e);
	            var r = SVGSelectorService.GetSelRect(id);
	            r.remove(r);
	            var label = SVGSelectorService.GetSelEdgeLabel(id)
	            label.remove(label);
	            var token = SVGSelectorService.GetSelEdgeToken(id)
	            token.remove(token);
	            var ewp = SVGSelectorService.GetEdgeWaypoints(id);
	            ewp.remove(ewp);
	            // redraw edge
	            PluginService.DrawEdge(edge, graphService.MainCanvas);
	            // ...and select it
	            tools.ClearSelection();
	            tools.Select(edge);

	            // the point that is being dragged must be redrawn at the new coordinates
	            ph = SVGSelectorService.GetEdgeRoutePoints(id, index);

	            if (index == routingPoints.length - 1) {
	                ph.attr("y", endY - 15);
	                ph.attr("x", endX - 15);
	            }
	            else {
	                ph.attr("y", endY - 8);
	                ph.attr("x", endX - 8);
	            }

	            //update domain grid
	            if (edge.Source.Type == 'domainGrid')
	                graphService.UpdateCell(edge.Source);
	            else
	                graphService.UpdateCell(edge.Target);

	            /////////////CHANGE CURSOR
	            document.body.style.cursor = "move";
	        }

	        function dragEndEdge() {
	            /////////////GET CELL
	            var id_tosplit = SVGSelectorService.GetVertexIdFromNode(this);
	            // id is id_index
	            var ids = id_tosplit.split('_');
	            var edge = graphService.GetCellById(ids[0]);
	            var index = ids[1];
	            if (index > edge.Route.length - 1)
	                index = edge.Route.length - 1;

	            if (startX != endX || startY != endY)
	                PluginService.MoveEdge(graphService, edge, index, startRoute, startX, startY, endX, endY);

	            tools.ClearSelection();
	            tools.Select(edge);
	            /////////////RESET CURSOR
	            document.body.style.cursor = "auto";
	            /////////////RESET OFFSET
	            offsetX = null;
	            offsetY = null;

	        }

	        function dragStartEdge() {
	            var id_tosplit = SVGSelectorService.GetVertexIdFromNode(this);
	            // id is id_index
	            var ids = id_tosplit.split('_');
	            var edge = graphService.GetCellById(ids[0]);
	            var routingPoins = edge.Route;
	            startX = routingPoins[ids[1]].x;
	            startY = routingPoins[ids[1]].y;
	            endX = routingPoins[ids[1]].x;
	            endY = routingPoins[ids[1]].y;
	            startRoute = [];
	            for (var i = 0; i < routingPoins.length; i++) {
	                startRoute.push({ x: routingPoins[i].x, y: routingPoins[i].y, quadrant: routingPoins[i].quadrant });
	            }

	            d3.event.sourceEvent.stopPropagation();
	            /////////////FLAG
	            isMoving = true;
	        }

	        function dragStartSingleCell(cell) {

	            cell.offsetX = null;
	            cell.offsetY = null;
	            cell.startX = cell.X;
	            cell.startY = cell.Y;
	            cell.endX = cell.X;
	            cell.endY = cell.Y;
	            d3.event.sourceEvent.stopPropagation();
	            if (SharingService.MoveMode == "ghost") {
	                SVGGhostService.AddVertexGhost(cell.X, cell.Y, cell.Width, cell.Height, graphService.GraphId);
	            }
	            SVGAnchorService.HideAnchors(cell);
	            if (cell.CanHaveChildren) {
	                registerOffset(cell, cell.Children);
	            }
	        }

	        function updateChildren(cell, list) {
	            for (var i = 0; i < list.length; i++) {
	                var child = list[i];
	                var coff = childrenOffset[child.Id];
	                var cph = SVGSelectorService.GetVertexOuterPh(child.Id);
	                var oldX = child.X;
	                var oldY = child.Y;
	                child.X = cell.X + coff.ox;
	                child.Y = cell.Y + coff.oy;
	                cph.attr("x", cell.X + coff.ox);
	                cph.attr("y", cell.Y + coff.oy);
	                if (child.UpdateEdges)
	                    child.UpdateEdges(oldX, oldY);
	                tools.UpdateEdges(child);
	                PluginService.DrawVertex(child);

	                SVGPlaceholderService.UpdatePlaceholder(child);
	                if (child.CanHaveChildren)
	                    updateChildren(child, child.Children);
	            }
	        }

	        function getParentOnlyCells() {
	            var selectedCells = tools.GetAllSelectedCells();
	            //do something
	            var parentOnly = [];
	            for (var i = 0; i < selectedCells.length; i++) {
	                var cell = selectedCells[i]
	                if (cell.Type != "elbow") {
	                    if (cell.Parent == null) {
	                        parentOnly.push(cell);
	                    }
	                    else {
	                        if (!cell.Parent.IsSelected) {
	                            parentOnly.push(cell);
	                        }
	                    }
	                }
	            }
	            return parentOnly;
	        }

	        function cloneCellRecursive(cell) {

	            var clone = {};
	            clone = jQuery.extend({}, cell);
	            clone.__proto__ = cell.__proto__;
	            clone.Font = jQuery.extend({}, cell.Font);
	            clone.IsSelected = false;
	            clone.Incoming = [];
	            clone.Outgoing = [];
                clone.Id = window.$UIF.Utility.uuid();
	            clone.VMId = null;
	            clone.X = clone.X + (copyNumber * 24);
	            clone.Y = clone.Y + (copyNumber * 24);
	            if (cell.CanHaveChildren && cell.Children.length > 0) {
	                clone.Children = [];
	                for (var i = 0; i < cell.Children.length; i++) {
	                    var child = cloneCellRecursive(cell.Children[i]);
	                    child.Parent = clone;
	                    clone.Children.push(child);
	                }
	            }
	            return clone;
	        }

	        function copyCellsCv(selectedCells) {
	            var tmpcopy = [];
	            for (var i = 0; i < selectedCells.length; i++) {
	                var c = selectedCells[i];
	                var clone = cloneCellRecursive(c);
	                PluginService.CopyVertex(graphService, clone);
	                tmpcopy.push(clone);
	            }
	            //invert selection
	            tools.ClearSelection();
	            childrenOffset = {};
	            for (i = 0; i < tmpcopy.length; i++) {
	                tools.Select(tmpcopy[i]);
	                if (tmpcopy[i].CanHaveChildren) {
	                    moveOnTop(tmpcopy[i].Children);
	                    registerOffset(tmpcopy[i], tmpcopy[i].Children);
	                }
	            }
	        }

	        function copyCells(selectedCells) {
	            var tmpcopy = [];
	            clipboard = [];
	            for (var i = 0; i < selectedCells.length; i++) {
	                var c = selectedCells[i];
	                var clone = cloneCellRecursive(c);

	                PluginService.CopyVertex(graphService, clone);
	                tmpcopy.push(clone);
	                setOpacityRecursive(clone, 0.5);
	                c.X = c.startX;
	                c.Y = c.startY;
	                tools.UpdateEdges(c);
	                updateChildren(c, c.Children);
	                clipboard.push(c);
	            }
	            //invert selection
	            tools.ClearSelection();
	            childrenOffset = {};
	            for (i = 0; i < tmpcopy.length; i++) {
	                tools.Select(tmpcopy[i]);
	                if (tmpcopy[i].CanHaveChildren) {
	                    moveOnTop(tmpcopy[i].Children);
	                    registerOffset(tmpcopy[i], tmpcopy[i].Children);
	                }
	            }
	        }

	        function removeCells() {
	            var selectedCells = tools.GetAllSelectedCells();
	            PluginService.RemoveMultipleVertex(graphService, selectedCells);
	            for (var i = 0; i < clipboard.length; i++)
	                tools.Select(clipboard[i]);
	            clipboard = [];
	        }

	        function close(a, b) {
	            return (Math.abs(a - b) < 6);
	        }

	        function CheckAlign(cell) {

	            var cells = graphService.Cells;
	            cells = graphService.FlattenCells();

	        }

	        function moveOnTop(list) {
	            for (var i = 0; i < list.length; i++) {
	                var cell = list[i];
	                SVGSelectorService.MoveOnTop(cell, mainCanvas);
	                if (cell.CanHaveChildren)
	                    moveOnTop(cell.Children);
	            }
	        }

	        function registerOffset(cell, list) {
	            for (var i = 0; i < list.length; i++) {
	                var child = list[i];
	                childrenOffset[child.Id] = { ox: child.X - cell.X, oy: child.Y - cell.Y };
	                if (child.CanHaveChildren)
	                    registerOffset(child, child.Children);
	            }
	        }

	        function manageVertexClick(cell) {
	            if (d3.event.sourceEvent.ctrlKey) {
	                if (cell.IsSelected)
	                    tools.UnSelect(cell);
	                else
	                    tools.Select(cell);
	            }
	            else {
	                if (!cell.IsSelected) {
	                    tools.ClearSelection();
	                    tools.Select(cell);
	                }
	            }
	        }

	        function dragEndArrow() {
	            var selectedCells = tools.GetAllSelectedCells();
	            if (selectedCells.length > 0) {
	                var moving = selectedCells[0].startX != selectedCells[0].endX || selectedCells[0].startY != selectedCells[0].endY;
	                if (moving) {
	                    for (var i = 0; i < selectedCells.length; i++) {
	                        var cell = selectedCells[i];
	                        cell.parent = SVGSelectorService.GetCandidateParentFromCell(graphService, cell);
	                        cell.children = SVGSelectorService.GetCandidateChildrenFromCell(graphService, cell);
	                    }
	                    PluginService.MoveMultipleVertex(graphService, selectedCells);
	                }
	            }
	            document.body.style.cursor = "auto";
	            if (SharingService.MoveMode == "ghost")
	                SVGGhostService.RemoveVertexGhost();
	            isMoving = false;
	        }

	        d3.select("#svg_graphx").on('click', function () {
	            if (graphService.IsMultiSelectable === false) {
	                tools.ClearSelection();
	            }
	        })

	        this.IsMoving = function () {
	            return isMoving;
	        }

	        this.AttachDragDropEvents = function (cell) {
	            var oph = SVGSelectorService.GetVertexInnerPh(cell.Id);
	            var drag = d3.behavior.drag();
	            drag.on("drag", dragMove)
                .on("dragend", dragEnd)
                .on("dragstart", dragStart)
	            oph.call(drag);
	            $log.debug("[AttachDragDropEvents] executed for cell " + cell.Id);
	        }

	        this.AttachDragDropEventsEdge = function (cell) {
	            var routingPoints = cell.Route;
	            for (var i = 0; i < routingPoints.length; i++) {
	                var oph = SVGSelectorService.GetEdgeRoutePoints(cell.Id, i);
	                var drag = d3.behavior.drag();
	                drag.on("drag", dragMoveEdge)
                    .on("dragend", dragEndEdge)
                    .on("dragstart", dragStartEdge)
	                oph.call(drag);
	                $log.debug("[AttachDragDropEventsEdge] executed for edge " + cell.Id);
	            }


	        }

	        this.moveStart = function (cell) {
	            childrenOffset = {};

	            startX = cell.X;
	            startY = cell.Y;
	            endX = cell.X;
	            endY = cell.Y;

	            SVGSelectorService.MoveOnTop(cell, mainCanvas);
	            if (cell.CanHaveChildren) {
	                moveOnTop(cell.Children);
	                registerOffset(cell, cell.Children);
	            }

	        }

	        this.moveEndwithArrow = function () {
	            dragEndArrow();
	        }

	    }

	    return MoveService;
	}]);
})();

(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.PanZoomService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGGridService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
	function ($log, FlowConstants, SVGSelectorService, SVGGridService, FlowIdPrefixes) {

	    var PanZoomService = function (graphService, mainCanvas, scope, tools) {

	        var canvas = SVGSelectorService.GetMainCanvas(graphService.GraphId);
	        var svg = SVGSelectorService.GetSVG(graphService.GraphId);
	        var pan = SVGSelectorService.GetPan(graphService.GraphId);
	        var grid = SVGSelectorService.GetGrid(graphService.GraphId);
	        var graphContainer = $('#graphContainer');

	        var scale = 1;
	        var canPan = false;

	        var rangeMin = FlowConstants.zoomMin;
	        var rangeMax = FlowConstants.zoomMax;

	        var min = FlowConstants.initialWidth * rangeMin;
	        var max = FlowConstants.initialWidth * rangeMax;
	        var xScale = d3.scale.linear()
                             .domain([rangeMin, rangeMax])
                             .range([min, max]);

	        var miny = FlowConstants.initialHeight * rangeMin;
	        var maxy = FlowConstants.initialHeight * rangeMax;
	        var yScale = d3.scale.linear()
							.domain([rangeMin, rangeMax])
							.range([miny, maxy]);

	        var z = d3.behavior.zoom();
	        var startX = 0;
	        var startY = 0;
	        var scrollPosX = 0;
	        var scrollPosY = 0;

	        function getRight(cells) {

	            var maxX = 0;
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (maxX < cell.X + cell.Width)
	                    maxX = cell.X + cell.Width;
	            }

	            return maxX;
	        }

	        function getBottom(cells) {

	            var maxY = 0;
	            for (var i = 0; i < cells.length; i++) {
	                var cell = cells[i];
	                if (maxY < cell.Y + cell.Height)
	                    maxY = cell.Y + cell.Height;
	            }

	            return maxY;
	        }

	        function panMove() {
	            if (canPan) {
	                var mouse = d3.mouse(d3.select('body').node());
	                var x = mouse[0];
	                var y = mouse[1];

	                var deltaX = x - startX;
	                var deltaY = y - startY;

	                var newScrollX = scrollPosX - deltaX;
	                var newScrollY = scrollPosY - deltaY;

	                graphContainer.scrollLeft(newScrollX);
	                graphContainer.scrollTop(newScrollY);
	                d3.event.sourceEvent.stopPropagation();
	            }

	        }

	        function panEnd() {
	            startX = 0;
	            startY = 0;
	            scrollPosX = graphContainer.scrollLeft();
	            scrollPosY = graphContainer.scrollTop();
	            d3.event.sourceEvent.stopPropagation();
	        }

	        function panStart() {
	            var mouse = d3.mouse(d3.select('body').node());
	            startX = mouse[0];
	            startY = mouse[1];
	            scrollPosX = graphContainer.scrollLeft();
	            scrollPosY = graphContainer.scrollTop();
	            d3.event.sourceEvent.stopPropagation();
	        }

	        function zoom() {
	            if (d3.event)
	                scale = d3.event.scale;

	            var sh = xScale(scale);
	            var shy = yScale(scale);

	            svg.attr('width', sh);
	            svg.attr('height', shy);

	            var pan = SVGSelectorService.GetPan(graphService.GraphId);
	            pan.attr('width', sh);
	            pan.attr('height', shy);

	            canvas.attr("transform", "scale(" + scale + ")");
	            $('#workflow-context-menu').css("transform", "scale(" + scale + ")");

	            if (tools.ShowGrid)
	                SVGGridService.AddGrid(graphService.GraphId, scale);
	        }

	        this.GetScaledPosition = function (x, y) {
	            var xS = x / scale;
	            var yS = y / scale;
	            return { "x": xS, "y": yS };
	        };

	        this.ZoomIn = function () {
	            if (scale < rangeMax) {
	                scale += 0.1;
	                z.scale(scale);
	                zoom();
	            }
	        };

	        this.ZoomReset = function () {


	            scale = 1;
	            z.scale(scale);
	            zoom();
	        };

	        this.ZoomFit = function (graphService) {

	            if (graphService.Cells.length > 0) {

	                graphContainer.scrollLeft(0);
	                graphContainer.scrollTop(0);

	                var dim = SVGSelectorService.GetGraphContainerDimensions(graphService.GraphId);
	                var mindim = Math.max(dim[0], dim[1]);

	                var right = getRight(graphService.Cells) + 10;
	                var bottom = getBottom(graphService.Cells) + 10;

	                var rangeMin = FlowConstants.zoomMin;
	                var rangeMax = FlowConstants.zoomMax;

	                var minX = right * rangeMin;
	                var maxX = right * rangeMax;
	                var tempXScale = d3.scale.linear()
                                     .domain([rangeMin, rangeMax])
                                     .range([minX, maxX]);

	                var minY = bottom * rangeMin;
	                var maxY = bottom * rangeMax;
	                var tempYScale = d3.scale.linear()
                                     .domain([rangeMin, rangeMax])
                                     .range([minY, maxY]);

	                var cursor = rangeMin;

	                while (tempXScale(cursor) < dim[0] && tempYScale(cursor) < dim[1]) {
	                    cursor += 0.001;
	                }

	                scale = cursor;
	                z.scale(scale);
	                zoom();

	            }
	        };

	        this.ZoomOut = function () {
	            if (scale > rangeMin) {
	                scale -= 0.1;
	                z.scale(scale);
	                zoom();
	            }
	        };

	        this.GetScale = function () {
	            return scale;
	        };

	        this.AddPan = function (id) {

	            var svg = SVGSelectorService.GetSVG(id);

	            var pan = svg.append("rect")
                    .attr(
                    {
                        "id": FlowIdPrefixes.pan + scope.graphId,
                        "width": svg.attr("width"),
                        "height": svg.attr("height"),
                        "fill": "transparent",
                        "style": "cursor:default"
                    });

	            var drag = d3.behavior.drag();
	            drag.on("drag", panMove).on("dragend", panEnd).on("dragstart", panStart);
	            pan.call(drag);

	            pan.on('click', function () {
	                d3.event.stopPropagation();
	            });

	            pan.on('mouseover', function () {
	                canPan = true;
	            });

	            pan.on('mouseout', function () {
	                canPan = false;
	            });
	        };

	        this.RemovePan = function (id) {
	            SVGSelectorService.GetPan(id).remove();
	        };

	    };

	    return PanZoomService;
	}]);

})();



(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            ["$log",
            "siemens.simaticit.common.widgets.flowEditor.DefaultScenarioService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
	function ($log, DefaultScenarioService, SVGSelectorService, SVGAnchorService) {
	    //////SCENARIO
	    var scenario;

	    this.LoadFlow = function (graphService, id, args) {
	        try {
	            if (this.scenario.LoadFlow)
	                this.scenario.LoadFlow(graphService, id, args);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [LoadFlow] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanEdit = function (graphService, cell) {
	        try {
	            if (this.scenario.CanEdit)
	                return this.scenario.CanEdit(graphService, cell);
	            else
	                return DefaultScenarioService.CanEdit(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }

	    };

	    this.CanBringToFront = function (graphService, cell) {
	        try {
	            if (this.scenario.CanBringToFront)
	                return this.scenario.CanBringToFront(graphService, cell);
	            else
	                return DefaultScenarioService.CanBringToFront(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanBringForward = function (graphService, cell) {
	        try {
	            if (this.scenario.CanBringForward)
	                return this.scenario.CanBringForward(graphService, cell);
	            else
	                return DefaultScenarioService.CanBringForward(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanSendToBack = function (graphService, cell) {
	        try {
	            if (this.scenario.CanSendToBack)
	                return this.scenario.CanSendToBack(graphService, cell);
	            else
	                return DefaultScenarioService.CanSendToBack(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanSendBackward = function (graphService, cell) {
	        try {
	            if (this.scenario.CanSendBackward)
	                return this.scenario.CanSendBackward(graphService, cell);
	            else
	                return DefaultScenarioService.CanSendBackward(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanRemove = function (graphService, cell) {
	        try {
	            if (this.scenario.CanRemove)
	                return this.scenario.CanRemove(graphService, cell);
	            else
	                return DefaultScenarioService.CanRemove(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanRename = function (graphService, cell) {
	        try {
	            if (this.scenario.CanRename)
	                return this.scenario.CanRename(graphService, cell);
	            else
	                return DefaultScenarioService.CanRename(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.InitSvg = function (graphService, defs) {
	        try {
	            if (this.scenario.InitSvg)
	                this.scenario.InitSvg(graphService, defs);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [InitSvg] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.GetVertexes = function () {
	        try {
	            if (this.scenario.GetVertexes)
	                return this.scenario.GetVertexes();
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [GetVertexes] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.OnContextAction = function (graphService, vertex, actionName) {
	        try {
	            if (this.scenario.OnContextAction)
	                return this.scenario.OnContextAction(graphService, vertex, actionName);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [OnContextAction] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };


	    this.ContextAction = function (graphService, vertex) {
	        try {
	            if (this.scenario.ContextAction)
	                return this.scenario.ContextAction(graphService, vertex);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [ContextAction] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.GetEdges = function () {
	        try {
	            if (this.scenario.GetEdges)
	                return this.scenario.GetEdges();
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [GetEdges] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    //---  FMA shortcut US8034  ------------------
	    this.CopyVertex = function (graphService, vertex) {
	        try {
	            if (this.scenario.CopyVertex)
	                this.scenario.CopyVertex(graphService, vertex);
	            else
	                DefaultScenarioService.CopyVertex(graphService, vertex);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };
	    //-------------------------------------------

	    this.AddVertex = function (graphService, x, y, proto, parent, children) {
	        try {
	            if (this.scenario.AddVertex) {
	                this.scenario.AddVertex(graphService, x, y, proto, parent, children);
	            }
	            else
	                DefaultScenarioService.AddVertex(graphService, x, y, proto, parent, children);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.TransformVertex = function (graphService, vertex, proto) {
	        try {
	            if (this.scenario.TransformVertex) {
	                this.scenario.TransformVertex(graphService, vertex, proto);
	            }
	            else
	                DefaultScenarioService.TransformVertex(graphService, vertex, proto);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };


	    this.AddEdge = function (graphService, startCell, endCell) {
	        try {
	            if (this.scenario.AddEdge)
	                this.scenario.AddEdge(graphService, startCell, endCell);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [AddEdge] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.Save = function (graphService) {
	        try {
	            if (this.scenario.Save)
	                this.scenario.Save(graphService);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [Save] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.Refresh = function (graphService) {
	        try {
	            if (this.scenario.Refresh)
	                this.scenario.Refresh(graphService);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [Refresh] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.AutoGenerate = function (graphService) {
	        try {
	            if (this.scenario.AutoGenerate)
	                this.scenario.AutoGenerate(graphService);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [AutoGenerate] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.AutoGenerateAll = function (graphService) {
	        try {
	            if (this.scenario.AutoGenerateAll)
	                this.scenario.AutoGenerateAll(graphService);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [AutoGenerateAll] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };


	    //---  FMA  -----------------------------------
	    this.MoveMultipleVertex = function (graphService, cells) {
	        try {
	            if (this.scenario.MoveMultipleVertex)
	                this.scenario.MoveMultipleVertex(graphService, cells);
	            else
	                DefaultScenarioService.MoveMultipleVertex(graphService, cells);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };
	    this.RemoveMultipleVertex = function (graphService, cells) {
	        try {
	            if (this.scenario.RemoveMultipleVertex)
	                this.scenario.RemoveMultipleVertex(graphService, cells);
	            else
	                DefaultScenarioService.RemoveMultipleVertex(graphService, cells);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };
	    this.EditMultipleVertex = function (graphService, cells) {
	        try {
	            if (this.scenario.EditMultipleVertex)
	                this.scenario.EditMultipleVertex(graphService, cells);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [EditVertex] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };
	    //---------------------------------------------

	    this.MoveVertex = function (graphService, cell, startX, startY, endX, endY, parent, children) {
	        try {
	            if (this.scenario.MoveVertex)
	                this.scenario.MoveVertex(graphService, cell, startX, startY, endX, endY, parent, children);
	            else
	                DefaultScenarioService.MoveVertex(graphService, cell, startX, startY, endX, endY, parent);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.MoveEdge = function (graphService, cell, index, startRoute, startX, startY, endX, endY) {


	        try {
	            this.scenario.MoveEdge(graphService, cell, index, startRoute, startX, startY, endX, endY);
	        } catch (e) {
	            $log.error(e.message);
	        }

	    }

	    this.ResizeVertex = function (graphService, cell, oWidth, oHeight, oldX, oldY, children) {
	        try {
	            if (this.scenario.ResizeVertex)
	                this.scenario.ResizeVertex(graphService, cell, oWidth, oHeight, oldX, oldY, children);
	            else
	                DefaultScenarioService.ResizeVertex(graphService, cell, oWidth, oHeight);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.RemoveVertex = function (graphService, cell) {
	        try {
	            if (this.scenario.RemoveVertex)
	                this.scenario.RemoveVertex(graphService, cell);
	            else {
	                DefaultScenarioService.RemoveVertex(graphService, cell);
	            }

	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.RemoveEdge = function (graphService, cell) {
	        try {
	            if (this.scenario.RemoveEdge)
	                this.scenario.RemoveEdge(graphService, cell);
	            else
	                DefaultScenarioService.RemoveEdge(graphService, cell);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.EditVertex = function (graphService, cell) {
	        try {
	            if (this.scenario.EditVertex)
	                this.scenario.EditVertex(graphService, cell);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [EditVertex] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.EditEdge = function (graphService, cell) {
	        try {
	            if (this.scenario.EditEdge)
	                this.scenario.EditEdge(graphService, cell);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [EditEdge] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };


	    this.EditSettings = function (graphService) {
	        try {
	            if (this.scenario.EditSettings)
	                this.scenario.EditSettings(graphService);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [EditSettings] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.RenameCell = function (graphService, cell, oldName) {
	        try {
	            if (this.scenario.RenameCell)
	                this.scenario.RenameCell(graphService, cell, oldName);
	            else
	                DefaultScenarioService.RenameCell(graphService, cell, oldName);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.CanLink = function (graphService, source, target) {
	        try {
	            if (this.scenario.CanLink)
	                return this.scenario.CanLink(graphService, source, target);
	            else
	                return DefaultScenarioService.CanLink(graphService, source, target);
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.setScenario = function (scenario) {
	        try {

	            if (scenario)
	                this.scenario = scenario;
	            else
	                this.scenario = DefaultScenarioService;
	            $log.info("[" + this.scenario.Name + "] scenario loaded")

	        } catch (e) {
	            $log.error(e.message);
	        }
	    };

	    this.getScenario = function () {
	        return this.scenario;
	    };
	    ///BLOCKS&EDGES

	    this.DrawVertex = function (cell) {
	        var ph = SVGSelectorService.GetVertexInnerPh(cell.Id);
	        if (cell.Draw != null) {
	            cell.Draw(ph);
	        }
	        else {
	            $log.error("The vertex " + cell.Label + "has no [Draw] function defined");
	        }
	    };

	    this.DrawEdge = function (cell, mainCanvas) {
	        if (cell.Draw != null) {
	            return cell.Draw(mainCanvas);
	        }
	        else {
	            $log.error("The edge " + cell.Label + "has no [Draw] function defined");
	        }
	    };

	    this.CustomMouseOver = function (cell, linkable) {
	        if (cell.MouseOver != null) {
	            return cell.MouseOver(linkable);
	        }
	    };

	    this.CustomMouseOut = function (cell) {
	        if (cell.MouseOut != null) {
	            return cell.MouseOut();
	        }
	    };

	    this.LinkMouseOver = function (cell, linkable) {
	        if (cell.LinkMouseOver != null) {
	            return cell.LinkMouseOver(linkable);
	        }
	        else {
	            SVGAnchorService.DrawCanLinkFeedback(cell, linkable);
	        }
	    };

	    this.LinkMouseOut = function (cell) {
	        if (cell.LinkMouseOut != null) {
	            return cell.LinkMouseOut();
	        }

	    };

	    this.ConnectAndClone = function (graphService, cell, direction) {
	        try {
	            if (this.scenario.ConnectAndClone)
	                this.scenario.ConnectAndClone(graphService, cell, direction);
	            else
	                $log.info("The scenario " + this.scenario.Name + " does not implement a [ConnectAndClone] method");
	        } catch (e) {
	            $log.error(e.message);
	        }
	    };
	}]);
}());


(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.ResizeService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGPlaceholderService",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGGhostService",
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
	function ($log, SVGPlaceholderService, PluginService, FlowIdPrefixes, SVGSelectorService, SVGGhostService, SharingService) {

	    var ResizeService = function (graphService, mainCanvas, tools) {

	        var oMouse;
	        var startW, startH, startX, startY;
	        var isResizing = false;

	        function attach(rect) {
	            if (!graphService.IsReadOnly) {
	                var drag = d3.behavior.drag();
	                drag
                    .on("dragstart", resizeStart)
                    .on("drag", resizeMove)
                    .on("dragend", resizeEnd);
	                rect.call(drag);
	            }
	        }

	        function resizeStart() {
	            //////////KEEP START MOUSE POSITION
	            oMouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	            isResizing = true;
	            //////////KEEP START SIZE
	            var id = SVGSelectorService.GetVertexIdFromNode(this);
	            var cell = graphService.GetCellById(id);
	            startW = cell.Width;
	            startH = cell.Height;
	            startX = cell.X;
	            startY = cell.Y;

	            if (SharingService.ResizeMode == "ghost") {
	                SVGGhostService.AddVertexGhost(cell.X, cell.Y, cell.Width, cell.Height, graphService.GraphId);
	            }

	            tools.ClearSelection();
	        }

	        function resizeMove() {
	            //////////GET RESIZE MODE
	            var mode = SVGSelectorService.GetResizeMode(this);
	            //////////GET CELL
	            var id = SVGSelectorService.GetVertexIdFromNode(this);
	            var cell = graphService.GetCellById(id);
	            //////////GET MOUSE POSITION
	            var mouse = SVGSelectorService.GetMainCanvasMousePosition(mainCanvas);
	            //////////CALC DELTA
	            var deltaX = oMouse[0] - mouse[0];
	            var deltaY = oMouse[1] - mouse[1];
	            //////////INIT SIZE
	            var w = startW;
	            var h = startH;
	            var x = startX;
	            var y = startY;

	            if (mode.startsWith(FlowIdPrefixes.lb_corner)) {

	                x = startX - deltaX;
	                w = startW + deltaX;
	                h = startH - deltaY;

	                if (cell.PreserveRatio) {
	                    h = startH + deltaX;
	                }


	                document.body.style.cursor = "ne-resize";
	                mode = FlowIdPrefixes.lb_corner;
	            }

	            if (mode.startsWith(FlowIdPrefixes.rt_corner)) {

	                y = startY - deltaY;
	                w = startW - deltaX;
	                h = startH + deltaY;

	                if (cell.PreserveRatio) {
	                    w = startW + deltaY;
	                }

	                document.body.style.cursor = "ne-resize";
	                mode = FlowIdPrefixes.rt_corner;
	            }

	            if (mode.startsWith(FlowIdPrefixes.top)) {

	                y = startY - deltaY;
	                h = startH + deltaY;

	                if (cell.PreserveRatio) {
	                    w = startW + deltaY;
	                }

	                document.body.style.cursor = "n-resize";
	                mode = FlowIdPrefixes.top;
	            }

	            if (mode.startsWith(FlowIdPrefixes.left)) {

	                //FMA automatic resize
	                if (cell.BigBlockType == 4)
	                    return;

	                x = startX - deltaX;
	                w = startW + deltaX;

	                if (cell.PreserveRatio) {
	                    h = startH + deltaX;
	                    y = startY - deltaX;
	                }

	                document.body.style.cursor = "e-resize";
	                mode = FlowIdPrefixes.left;
	            }

	            if (mode.startsWith(FlowIdPrefixes.rb_corner)) {
	                w = startW - deltaX;
	                h = startH - deltaY;

	                if (cell.PreserveRatio)
	                    h = startH - deltaX;

	                document.body.style.cursor = "nw-resize";
	                mode = FlowIdPrefixes.rb_corner;

	            }

	            if (mode.startsWith(FlowIdPrefixes.lt_corner)) {
	                x = startX - deltaX;
	                y = startY - deltaY;
	                w = startW + deltaX;
	                h = startH + deltaY;

	                if (cell.PreserveRatio) {
	                    h = startH + deltaX;
	                    y = startY - deltaX;
	                }

	                document.body.style.cursor = "nw-resize";
	                mode = FlowIdPrefixes.lt_corner;
	            }

	            if (mode.startsWith(FlowIdPrefixes.bottom)) {
	                h = startH - deltaY;

	                if (cell.PreserveRatio)
	                    w = startW - deltaY;

	                document.body.style.cursor = "n-resize";
	                mode = FlowIdPrefixes.bottom;
	            }

	            if (mode.startsWith(FlowIdPrefixes.right)) {
	                w = startW - deltaX;

	                if (cell.PreserveRatio)
	                    h = startH - deltaX;

	                document.body.style.cursor = "e-resize";
	                mode = FlowIdPrefixes.right;

	            }

	            /////////////SNAP IF REQUESTED
	            var snapped = tools.SnapOnResize(w, h);
	            w = snapped[0];
	            h = snapped[1];
	            snapped = tools.SnapOnMove(x, y);
	            x = snapped[0];
	            y = snapped[1];

	            /////////////CHECK ZERO
	            if (x < 0 || y < 0)
	                return;

	            /////////////CHECK MINIMUM
	            if (w >= cell.MinWidth) {
	                cell.Width = w;
	                cell.X = x;
	            }
	            else {
	                cell.Width = cell.MinWidth;
	            }

	            if (h >= cell.MinHeight) {
	                cell.Height = h;
	                cell.Y = y;
	            }
	            else {
	                cell.Height = cell.MinHeight;
	            }

	            if (SharingService.ResizeMode == "full") {
	                /////////////REDRAW VERTEX
	                var p = SVGSelectorService.GetVertexInnerPh(cell.Id);
	                p.html("");
	                PluginService.DrawVertex(cell, p);
	                /////////////UPDATE OPH
	                SVGPlaceholderService.UpdatePlaceholder(cell);
	                /////////////UPDATE EDGES
	                tools.UpdateEdges(cell);
	            }
	            else {
	                SVGGhostService.UpdateVertexGhost(cell.X, cell.Y, cell.Width, cell.Height);
	            }

	        }

	        function resizeEnd() {
	            /////////////GET CELL
	            var id = SVGSelectorService.GetVertexIdFromNode(this);
	            var cell = graphService.GetCellById(id);

	            /////////// get children
	            var children = SVGSelectorService.GetCandidateChildrenFromCell(graphService, cell);
	            ////// get parent
	            cell.parent = SVGSelectorService.GetCandidateParentFromCell(graphService, cell);
	            /////////////CALL RESIZE ON PLUGIN
	            PluginService.ResizeVertex(graphService, cell, startW, startH, startX, startY, children);
	            /////////////RESET CURSOR
	            document.body.style.cursor = "auto";
	            /////////////RESET VARS
	            isResizing = false;

	            SVGGhostService.RemoveVertexGhost();
	            SVGPlaceholderService.UpdatePlaceholder(cell);

	            //FMA automatic resize
	            if (cell.BigBlockType == 0) {
	                var solutionarea = graphService.Cells.filter(function (v) { return (v.BigBlockType == 4) })[0];
	                var businessDomain = graphService.Cells.filter(function (v) { return (v.BigBlockType == 3) })[0];
	                var readiness = graphService.Cells.filter(function (v) { return (v.BigBlockType == 1) })[0];
	                readiness.Width = cell.Width;
	                SVGPlaceholderService.UpdatePlaceholder(readiness);
	                readiness.GraphService.UpdateCell(readiness);

	                businessDomain.X = cell.Width + 60;
	                businessDomain.GraphService.UpdateCell(businessDomain);
	                var Delta = businessDomain.X + businessDomain.Width + 30 - solutionarea.X;
	                SVGPlaceholderService.UpdatePlaceholder(businessDomain);
	                SVGPlaceholderService.UpdatePlaceholder(solutionarea);

	                solutionarea.GraphService.UpdateSolutionArea(solutionarea, Delta, true);
	            }

	        }

	        this.IsResizing = function () {
	            return isResizing;
	        };

	        this.AttachResizeEvent = function (cell) {
	            attach(SVGSelectorService.GetBottomResizeRect(cell.Id));
	            attach(SVGSelectorService.GetRightResizeRect(cell.Id));
	            attach(SVGSelectorService.GetLeftResizeRect(cell.Id));
	            attach(SVGSelectorService.GetTopResizeRect(cell.Id));
	            attach(SVGSelectorService.GetRBCornerResizeRect(cell.Id));
	            attach(SVGSelectorService.GetRTCornerResizeRect(cell.Id));
	            attach(SVGSelectorService.GetLTCornerResizeRect(cell.Id));
	            attach(SVGSelectorService.GetLBCornerResizeRect(cell.Id));
	        };

	    };

	    return ResizeService;

	}]);

})();


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGAlignService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes",
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGDebugService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectionService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
	function ($log, FlowConstants, FlowIdPrefixes, SharingService,
        SVGSelectorService, SVGDebugService, SVGSelectionService, SVGAnchorService) {

	    this.AlignmentType = {
	        STARTX: 0,
	        MIDDLEX: 1,
	        ENDX: 2,
	        STARTENDX: 3,
	        ENDSTARTX: 4,
	        STARTY: 5,
	        MIDDLEY: 6,
	        ENDY: 7,
	        STARTENDY: 8,
	        ENDSTARTY: 9
	    }


	    this.DrawAlign = function (startCell, endCell, alignmentType) {
	        // cell1 must always the one higher or leftmost
	        var cell1, cell2, sgn;
	        if (alignmentType == this.AlignmentType.STARTENDX
                || alignmentType == this.AlignmentType.ENDSTARTX
                || alignmentType == this.AlignmentType.STARTENDY
                || alignmentType == this.AlignmentType.ENDSTARTY) {

	            cell1 = startCell;
	            cell2 = endCell;

	        }
	        else if (alignmentType < this.AlignmentType.STARTENDX) {
	            if (startCell.Y > endCell.Y) {
	                cell1 = endCell;
	                cell2 = startCell;
	            }
	            else {
	                cell1 = startCell;
	                cell2 = endCell;
	            }
	        }
	        else {
	            if (startCell.X > endCell.X) {
	                cell1 = endCell;
	                cell2 = startCell;
	            }
	            else {
	                cell1 = startCell;
	                cell2 = endCell;
	            }
	        }

	        var DELTA = 15;

	        var x1, x2, y1, y2;


	        switch (alignmentType) {
	            case this.AlignmentType.STARTX:
	                {
	                    x1 = cell1.X;
	                    x2 = cell2.X;
	                    y1 = cell1.Y - DELTA;
	                    y2 = cell2.Y + cell2.Height + DELTA;
	                    break;
	                }
	            case this.AlignmentType.MIDDLEX:
	                {
	                    x1 = cell1.X + cell1.Width / 2;
	                    x2 = cell1.X + cell1.Width / 2;
	                    y1 = cell1.Y - DELTA;
	                    y2 = cell2.Y + cell2.Height + DELTA;
	                    break;
	                }
	            case this.AlignmentType.ENDX:
	                {
	                    x1 = cell1.X + cell1.Width;
	                    x2 = cell2.X + cell2.Width;
	                    y1 = cell1.Y - DELTA;
	                    y2 = cell2.Y + cell2.Height + DELTA;
	                    break;
	                }
	            case this.AlignmentType.STARTENDX:
	                {
	                    if (startCell.Y < endCell.Y) {
	                        x1 = cell1.X;
	                        x2 = cell2.X + cell2.Width;
	                        y1 = cell1.Y - DELTA;
	                        y2 = cell2.Y + cell2.Height + DELTA;
	                    }
	                    else {
	                        x1 = cell2.X + cell2.Width;
	                        x2 = cell1.X;
	                        y1 = cell2.Y - DELTA;
	                        y2 = cell1.Y + cell1.Height + DELTA;
	                    }
	                    break;
	                }
	            case this.AlignmentType.ENDSTARTX:
	                {
	                    if (startCell.Y < endCell.Y) {
	                        x1 = cell1.X + cell1.Width;
	                        x2 = cell2.X;
	                        y1 = cell1.Y - DELTA;
	                        y2 = cell2.Y + cell2.Height + DELTA;
	                    }
	                    else {
	                        x1 = cell2.X;
	                        x2 = cell1.X + cell1.Width;
	                        y1 = cell2.Y - DELTA;
	                        y2 = cell1.Y + cell1.Height + DELTA;
	                    }
	                    break;
	                }
	            case this.AlignmentType.STARTENDY:
	                {
	                    if (startCell.X < endCell.X) {
	                        x1 = cell1.X - DELTA;
	                        x2 = cell2.X + cell2.Width + DELTA;
	                        y1 = cell1.Y;
	                        y2 = cell2.Y + cell2.Height;
	                    }
	                    else {
	                        x1 = cell2.X - DELTA;
	                        x2 = cell1.X + cell1.Width + DELTA;
	                        y1 = cell2.Y + cell2.Height;
	                        y2 = cell1.Y;
	                    }
	                    break;
	                }
	            case this.AlignmentType.ENDSTARTY:
	                {
	                    if (startCell.X < endCell.X) {
	                        x1 = cell1.X - DELTA;
	                        x2 = cell2.X + cell2.Width + DELTA;
	                        y1 = cell1.Y + cell1.Height;
	                        y2 = cell2.Y;
	                    }
	                    else {
	                        x1 = cell2.X - DELTA;
	                        x2 = cell1.X + cell1.Width + DELTA;
	                        y1 = cell2.Y;
	                        y2 = cell1.Y + cell1.Height;
	                    }
	                    break;
	                }
	            case this.AlignmentType.STARTY:
	                {
	                    x1 = cell1.X - DELTA;
	                    x2 = cell2.X + cell2.Width + DELTA;
	                    y1 = cell1.Y;
	                    y2 = cell2.Y;
	                    break;
	                }
	            case this.AlignmentType.MIDDLEY:
	                {

	                    x1 = cell1.X - DELTA;
	                    x2 = cell2.X + cell2.Width + DELTA;
	                    y1 = cell1.Y + cell1.Height / 2;
	                    y2 = cell2.Y + cell2.Height / 2;
	                    break;
	                }
	            case this.AlignmentType.ENDY:
	                {
	                    x1 = cell1.X - DELTA;
	                    x2 = cell2.X + cell2.Width + DELTA;
	                    y1 = cell1.Y + cell1.Height;
	                    y2 = cell2.Y + cell2.Height;
	                    break;
	                }

	        }



	        var mainCanvas = cell1.GraphService.MainCanvas;
	        mainCanvas.append("line")
	        mainCanvas.attr("id", FlowIdPrefixes.aligner + startCell.Id)
	        mainCanvas.attr("x1", x1)
	        mainCanvas.attr("x2", x2)
	        mainCanvas.attr("y1", y1)
	        mainCanvas.attr("y2", y2)
	        mainCanvas.style("stroke-dasharray", ("4,2"))
	        mainCanvas.attr("stroke-width", 1)
	        mainCanvas.attr("stroke", "orange");

	    }

	    this.CleanAligner = function (cell) {
	        var ph = SVGSelectorService.GetAligner(cell.Id);
	        if (ph)
	            ph.remove();
	    }

	}]);
}());



(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {


	    var hide = function (element) {
	        element.transition().duration(200).style({ "opacity": 0, "display": "none" });
	    };

	    var show = function (element) {
	        element.transition().duration(200).style({ "opacity": 0.5, "display": "block" });
	    };

	    var getLinkRectWidth = function (cell) {
	        return cell.Width + FlowConstants.linkRectGap * 2;
	    };

	    var getLinkRectHeight = function (cell) {
	        return cell.Height + FlowConstants.linkRectGap * 2;
	    };

	    var getLinkRectPos = function (cell) {
	        return FlowConstants.innerPlaceholderGap - FlowConstants.linkRectGap;
	    };

	    var appendAnchor = function (points, cell, tag, connectAndClone) {
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        var dataString = points.map(function (d) { return d.x + "," + d.y }).join(",");
	        var a = p.append("polygon")
            .attr("class", 'sit-flow-anchor')
            .style({ "opacity": 0, "display": "none" })
            .style("cursor", "alias")
            .attr("id", tag + cell.Id)
            .attr("points", dataString)
            .append('title')
	        if (connectAndClone)
	            a.html("Drag to create edge, ctrl + click to clone and connect");
	        else
	            a.html("Drag to create edge");
	    };

	    var getRightAnchorPoints = function (cell) {
	        var poh = cell.Height + FlowConstants.innerPlaceholderGap * 2;
	        var pow = cell.Width + FlowConstants.innerPlaceholderGap * 2;
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        var phw = parseInt(pow, 10);
	        var phh = parseInt(poh, 10);
	        var aw = FlowConstants.anchorWidth;
	        var ah = FlowConstants.anchorHeight;
	        var p1 = { x: phw - aw, y: phh / 2 - ah / 2 };
	        var p2 = { x: phw, y: phh / 2 };
	        var p3 = { x: phw - aw, y: phh / 2 + ah / 2 };
	        return [p1, p2, p3];
	    };

	    var appendRightAnchor = function (cell, connectAndClone) {
	        var points = getRightAnchorPoints(cell);
	        appendAnchor(points, cell, FlowIdPrefixes.right_anchor, connectAndClone);
	    };

	    var getBottomAnchorPoints = function (cell) {
	        var poh = cell.Height + FlowConstants.innerPlaceholderGap * 2;
	        var pow = cell.Width + FlowConstants.innerPlaceholderGap * 2;
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        var phw = parseInt(pow, 10);
	        var phh = parseInt(poh, 10);
	        var aw = FlowConstants.anchorWidth;
	        var ah = FlowConstants.anchorHeight;
	        var p1 = { x: phw / 2 - ah / 2, y: phh - aw };
	        var p2 = { x: phw / 2, y: phh };
	        var p3 = { x: phw / 2 + ah / 2, y: phh - aw };
	        return [p1, p2, p3];
	    };

	    var appendBottomAnchor = function (cell, connectAndClone) {
	        var points = getBottomAnchorPoints(cell);
	        appendAnchor(points, cell, FlowIdPrefixes.bottom_anchor, connectAndClone);
	    };

	    var getLeftAnchorPoints = function (cell) {
	        var poh = cell.Height + FlowConstants.innerPlaceholderGap * 2;
	        var pow = cell.Width + FlowConstants.innerPlaceholderGap * 2;
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        var phw = parseInt(pow, 10);
	        var phh = parseInt(poh, 10);
	        var aw = FlowConstants.anchorWidth;
	        var ah = FlowConstants.anchorHeight;
	        var p1 = { x: aw, y: phh / 2 - ah / 2 };
	        var p2 = { x: 0, y: phh / 2 };
	        var p3 = { x: aw, y: phh / 2 + ah / 2 };
	        return [p1, p2, p3];
	    };

	    var appendLeftAnchor = function (cell, connectAndClone) {
	        var points = getLeftAnchorPoints(cell);
	        appendAnchor(points, cell, FlowIdPrefixes.left_anchor, connectAndClone);
	    };

	    var getTopAnchorPoints = function (cell) {
	        var poh = cell.Height + FlowConstants.innerPlaceholderGap * 2;
	        var pow = cell.Width + FlowConstants.innerPlaceholderGap * 2;
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        var phw = parseInt(pow, 10);
	        var phh = parseInt(poh, 10);
	        var aw = FlowConstants.anchorWidth;
	        var ah = FlowConstants.anchorHeight;
	        var p1 = { x: phw / 2 - ah / 2, y: aw };
	        var p2 = { x: phw / 2, y: 0 };
	        var p3 = { x: phw / 2 + ah / 2, y: aw };
	        return [p1, p2, p3];
	    };

	    var appendTopAnchor = function (cell, connectAndClone) {
	        var points = getTopAnchorPoints(cell);
	        appendAnchor(points, cell, FlowIdPrefixes.top_anchor, connectAndClone);
	    };

	    this.AppendAnchor = function (cell, connectAndClone) {
	        if (cell.Connectable == undefined || cell.Connectable) {
	            if (cell.DrawAnchor) {
	                var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	                var anchor = cell.DrawAnchor(p);
	                anchor.attr("id", FlowIdPrefixes.customAnchor + cell.Id);
	                anchor.style({ "opacity": 0, "display": "none" });
	            } else {
	                appendRightAnchor(cell, connectAndClone);
	                appendBottomAnchor(cell), connectAndClone;
	                appendLeftAnchor(cell, connectAndClone);
	                appendTopAnchor(cell, connectAndClone);
	            }
	        }
	    };

	    this.AppendLinkRect = function (ph, cell) {
	        ph.append("rect")
	        ph.attr("id", FlowIdPrefixes.linkrect + cell.Id)
	        ph.attr("width", getLinkRectWidth(cell))
	        ph.attr("height", getLinkRectHeight(cell))
	        ph.attr("x", getLinkRectPos(cell))
	        ph.attr("y", getLinkRectPos(cell))
	        ph.style({ "opacity": 0, "display": "none" });

	    };

	    this.UpdateLinkRect = function (cell) {
	        var lr = SVGSelectorService.GetLinkRect(cell.Id);
	        lr.attr("width", getLinkRectWidth(cell));
	        lr.attr("height", getLinkRectHeight(cell));
	    };

	    this.UpdateAnchor = function (cell) {
	        var r = SVGSelectorService.GetRightAnchor(cell.Id);
	        var rp = getRightAnchorPoints(cell);
	        var rds = rp.map(function (d) { return d.x + "," + d.y }).join(",");
	        r.attr("points", rds);

	        var b = SVGSelectorService.GetBottomAnchor(cell.Id);
	        var bp = getBottomAnchorPoints(cell);
	        var bds = bp.map(function (d) { return d.x + "," + d.y }).join(",");
	        b.attr("points", bds);

	        var l = SVGSelectorService.GetLeftAnchor(cell.Id);
	        var lp = getLeftAnchorPoints(cell);
	        var lds = lp.map(function (d) { return d.x + "," + d.y }).join(",");
	        l.attr("points", lds);

	        var t = SVGSelectorService.GetTopAnchor(cell.Id);
	        var tp = getTopAnchorPoints(cell);
	        var tds = tp.map(function (d) { return d.x + "," + d.y }).join(",");
	        t.attr("points", tds);
	    };

	    this.RemoveGhost = function () {
	        var g = d3.select(FlowIdPrefixes.hash + FlowIdPrefixes.ghost);
	        g.remove(g);
	        document.body.style.cursor = "auto";
	    };

	    this.AddGhost = function (mainCanvas, x1, y1, x2, y2, id) {
	        mainCanvas.insert("line", FlowIdPrefixes.hash + FlowIdPrefixes.ghost)
	        mainCanvas.attr("id", "ghostLine")
	        mainCanvas.attr("x1", x1)
	        mainCanvas.attr("y1", y1)
	        mainCanvas.attr("x2", x2)
	        mainCanvas.attr("y2", y2)
	        mainCanvas.attr("marker-end", "url(#ghostmarker)")
	        mainCanvas.attr("stroke-width", 2)
	        mainCanvas.attr("stroke", "black");
	    };

	    this.DrawCanLinkFeedback = function (cell, linkable) {
	        var r = SVGSelectorService.GetLinkRect(cell.Id);
	        if (linkable) {
	            r.attr("class", 'sit-flow-link-ok-rect');
	        }
	        else {
	            r.attr("class", 'sit-flow-link-no-rect ');
	        }
	        r.transition().duration(200).style({ "opacity": 1, "display": "block" });
	    }

	    this.HideAnchors = function (cell) {
	        hide(SVGSelectorService.GetLinkRect(cell.Id));
	        hide(SVGSelectorService.GetRightAnchor(cell.Id));
	        hide(SVGSelectorService.GetBottomAnchor(cell.Id));
	        hide(SVGSelectorService.GetLeftAnchor(cell.Id));
	        hide(SVGSelectorService.GetTopAnchor(cell.Id));
	        hide(SVGSelectorService.GetCustomAnchor(cell.Id));
	    };

	    this.ShowAnchors = function (cell) {
	        show(SVGSelectorService.GetRightAnchor(cell.Id));
	        show(SVGSelectorService.GetBottomAnchor(cell.Id));
	        show(SVGSelectorService.GetLeftAnchor(cell.Id));
	        show(SVGSelectorService.GetTopAnchor(cell.Id));
	        show(SVGSelectorService.GetCustomAnchor(cell.Id));
	    };

	    this.RemoveGhost = function () {
	        SVGSelectorService.GetGhost().remove();
	        document.body.style.cursor = "auto";
	    };

	    this.AddGhost = function (mainCanvas, x1, y1, x2, y2, id) {
	        mainCanvas.append("line")
                .attr({
                    "id": FlowIdPrefixes.ghost,
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2,
                    "marker-end": "url(#ghostmarker)",
                    "stroke-width": 2,
                    "stroke": "black"
                });
	    };

	    this.AddLinkRect = function (cell) {
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        p.append("rect")
            .attr({
                "id": FlowIdPrefixes.linkrect + cell.Id,
                "width": SVGSelectorService.GetLinkRectWidth(cell),
                "height": SVGSelectorService.GetLinkRectHeight(cell),
                "x": SVGSelectorService.GetLinkRectPos(cell),
                "y": SVGSelectorService.GetLinkRectPos(cell),
                "style": "opacity:0",
                "display": "none"
            });
	    };

	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGContextMenuService",
            ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
                'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
                "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

                function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {

                    function clean(cell) {
                        FlowIdPrefixes.contextMenuButtons.forEach(function (item) {
                            d3.select('#' + item + cell.Id).remove();
                        });
                    }

                    this.addContextMenuButtons = function (cell) {
                        //contextMenu: name, icon, tooltip, callback
                        // varify the condition which button to be added
                        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
                        if (p[0][0] === null) {
                            p = SVGSelectorService.GetSelRect(cell.Id);
                        }
                        var g;
                        clean(cell);
                        if (cell.ContextMenu && cell.ContextMenu[0]) {
                            g = p.append("g")
                                .attr("id", FlowIdPrefixes.contextMenuButtons[0] + cell.Id)
                                .style({ "opacity": 0, "display": "none" });

                            g.append("circle")
                                .attr("id", FlowIdPrefixes.anchor + cell.Id)
                                .attr("cx", FlowConstants.contextMenuButtonWidth * 2 - 7)
                                .attr("cy", FlowConstants.contextMenuButtonWidth * 2 - 7)
                                .attr("r", FlowConstants.contextMenuButtonWidth + 1)
                                .attr("class", 'sit-flow-context-button-circle');

                            if (cell.ContextMenu[0].icon.toLowerCase().split('.').pop() === 'svg') {
                                g.append("image")
                                    .attr("xlink:href", cell.ContextMenu[0].icon)
                                    .attr("height", 16)
                                    .attr('width', 16)
                                    .attr("x", FlowConstants.contextMenuButtonWidth - 5)
                                    .attr("y", FlowConstants.contextMenuButtonWidth - 5)
                            } else {
                                g.append("text")
                                    .attr("class", "sit-flow-context-button-icon")
                                    .style("text-anchor", "middle")
                                    .attr("x", FlowConstants.contextMenuButtonWidth * 2 - 7)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 2 - 2)
                                    .text(cell.ContextMenu[0].icon);
                            }
                            g.append('title').text(cell.ContextMenu[0].tooltip);
                        }
                        if (cell.ContextMenu && cell.ContextMenu[1]) {
                            g = p.append("g")
                                .attr("id", FlowIdPrefixes.contextMenuButtons[1] + cell.Id)
                                .style({ "opacity": 0, "display": "none" });

                            g.append("circle")
                                .attr("id", FlowIdPrefixes.anchor + cell.Id)
                                .attr("cx", FlowConstants.contextMenuButtonWidth * 4 - 2)
                                .attr("cy", FlowConstants.contextMenuButtonWidth + 3)
                                .attr("r", FlowConstants.contextMenuButtonWidth + 1)
                                .attr("class", 'sit-flow-context-button-circle');
                            if (cell.ContextMenu[1].icon.toLowerCase().split('.').pop() === 'svg') {
                                g.append("image")
                                    .attr("xlink:href", cell.ContextMenu[1].icon)
                                    .attr("height", 16)
                                    .attr('width', 16)
                                    .attr("x", FlowConstants.contextMenuButtonWidth * 3)
                                    .attr("y", FlowConstants.contextMenuButtonWidth - 5)

                            } else {
                                g.append("text")
                                    .attr("class", "sit-flow-context-button-icon")
                                    .style("text-anchor", "middle")
                                    .attr("x", FlowConstants.contextMenuButtonWidth * 4 - 2)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 2 - 3)
                                    .text(cell.ContextMenu[1].icon);

                            }


                            g.append('title').text(cell.ContextMenu[1].tooltip);
                        }
                        if (cell.ContextMenu && cell.ContextMenu[2]) {
                            g = p.append("g")
                                .attr("id", FlowIdPrefixes.contextMenuButtons[2] + cell.Id)
                                .style({ "opacity": 0, "display": "none" });

                            g.append("circle")
                                .attr("id", FlowIdPrefixes.anchor + cell.Id)
                                .attr("cx", FlowConstants.contextMenuButtonWidth + 3)
                                .attr("cy", FlowConstants.contextMenuButtonWidth * 4 - 2)
                                .attr("r", FlowConstants.contextMenuButtonWidth + 1)
                                .attr("class", 'sit-flow-context-button-circle');

                            if (cell.ContextMenu[2].icon.toLowerCase().split('.').pop() === 'svg') {
                                g.append("image")
                                    .attr("xlink:href", cell.ContextMenu[2].icon)
                                    .attr("height", 16)
                                    .attr('width', 16)
                                    .attr("x", FlowConstants.contextMenuButtonWidth - 5)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 3)

                            } else {
                                g.append("text")
                                    .attr("class", "sit-flow-context-button-icon")
                                    .style("text-anchor", "middle")
                                    .attr("x", FlowConstants.contextMenuButtonWidth + 3)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 5 - 5)
                                    .text(cell.ContextMenu[2].icon);

                            }



                            g.append('title').text(cell.ContextMenu[2].tooltip);
                        }
                        if (cell.ContextMenu && cell.ContextMenu[3]) {
                            g = p.append("g")
                                .attr("id", FlowIdPrefixes.contextMenuButtons[3] + cell.Id)
                                .style({ "opacity": 0, "display": "none" });

                            g.append("circle")
                                .attr("id", FlowIdPrefixes.anchor + cell.Id)
                                .attr("cx", FlowConstants.contextMenuButtonWidth * 6 + 2)
                                .attr("cy", FlowConstants.contextMenuButtonWidth + 3)
                                .attr("r", FlowConstants.contextMenuButtonWidth + 1)
                                .attr("class", 'sit-flow-context-button-circle');

                            if (cell.ContextMenu[3].icon.toLowerCase().split('.').pop() === 'svg') {
                                g.append("image")
                                    .attr("xlink:href", cell.ContextMenu[3].icon)
                                    .attr("height", 16)
                                    .attr('width', 16)
                                    .attr("x", FlowConstants.contextMenuButtonWidth * 5 + 4)
                                    .attr("y", FlowConstants.contextMenuButtonWidth - 5)
                            } else {
                                g.append("text")
                                    .attr("class", "sit-flow-context-button-icon")
                                    .style("text-anchor", "middle")
                                    .attr("x", FlowConstants.contextMenuButtonWidth * 6 + 2)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 2 - 2)
                                    .text(cell.ContextMenu[3].icon)
                            }




                            g.append('title').text(cell.ContextMenu[3].tooltip);
                        }
                        if (cell.ContextMenu && cell.ContextMenu[4]) {
                            g = p.append("g")
                                .attr("id", FlowIdPrefixes.contextMenuButtons[4] + cell.Id)
                                .style({ "opacity": 0, "display": "none" });

                            g.append("circle")
                                .attr("id", FlowIdPrefixes.anchor + cell.Id)
                                .attr("cx", FlowConstants.contextMenuButtonWidth + 3)
                                .attr("cy", FlowConstants.contextMenuButtonWidth * 6 + 2)
                                .attr("r", FlowConstants.contextMenuButtonWidth + 1)
                                .attr("class", 'sit-flow-context-button-circle');

                            if (cell.ContextMenu[4].icon.toLowerCase().split('.').pop() === 'svg') {
                                g.append("image")
                                    .attr("xlink:href", cell.ContextMenu[4].icon)
                                    .attr("height", 16)
                                    .attr('width', 16)
                                    .attr("x", FlowConstants.contextMenuButtonWidth - 5)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 5 + 4)
                            } else {
                                g.append("text")
                                    .attr("class", "sit-flow-context-button-icon")
                                    .style("text-anchor", "middle")
                                    .attr("x", FlowConstants.contextMenuButtonWidth + 3)
                                    .attr("y", FlowConstants.contextMenuButtonWidth * 7 - 3)
                                    .text(cell.ContextMenu[4].icon);
                            }




                            g.append('title').text(cell.ContextMenu[4].tooltip);
                        }

                        if (cell.IsSelected)
                            this.showContextMenuButtons(cell)
                        else
                            this.hideContextMenuButtons(cell);


                    };

                    this.hideContextMenuButtons = function (cell) {
                        var buttons = SVGSelectorService.getContextMenuButtons(cell.Id);
                        buttons.forEach(function (button) {
                            button.transition().duration(300).style({ "opacity": 0, "display": "none" });
                        });
                    };

                    this.showContextMenuButtons = function (cell) {
                        var buttons = SVGSelectorService.getContextMenuButtons(cell.Id);
                        buttons.forEach(function (button) {
                            button.transition().duration(300).style({ "opacity": 1, "display": "block" });
                        });
                    };

                }]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGDebugService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {

	    function getCoordsString(cell) {
	        return "x:" + cell.X + ", y:" + cell.Y;
	    }

	    function getDimString(cell) {
	        return "w:" + cell.Width + ", h:" + cell.Height;
	    }

	    function getCoordsX(cell) {
	        return cell.X;
	    }

	    function getCoordsY(cell) {
	        return cell.Y + SVGSelectorService.GetOPHHeight(cell);
	    }

	    function getDimX(cell) {
	        return cell.X;
	    }

	    function getDimY(cell) {
	        return cell.Y + SVGSelectorService.GetOPHHeight(cell) - 17;
	    }

	    this.AddDebugElements = function (mainCanvas, ph, cell) {
	        ph.append("rect")
                .attr("id", FlowIdPrefixes.debugOPH + cell.Id)
                .attr("width", SVGSelectorService.GetOPHWidth(cell))
                .attr("height", SVGSelectorService.GetOPHHeight(cell))
                .attr("cx", cell.X - FlowConstants.innerPlaceholderGap)
                .attr("cy", cell.Y - FlowConstants.innerPlaceholderGap)
                .attr("style", "stroke:black;stroke-width:1;opacity:0.5")
	            .attr("fill", "yellow");

	        ph.append("rect")
            .attr("id", FlowIdPrefixes.debugIPH + cell.Id)
            .attr("width", cell.Width)
            .attr("height", cell.Height)
            .attr("x", FlowConstants.innerPlaceholderGap)
            .attr("y", FlowConstants.innerPlaceholderGap)
            .attr("style", "stroke:black;stroke-width:1;opacity:0.5")
            .attr("fill", "pink");

	        mainCanvas.append("text")
                .attr("id", FlowIdPrefixes.debugXY + cell.Id)
                .attr("x", getCoordsX(cell))
                .attr("y", getCoordsY(cell))
                .text(getCoordsString(cell));

	        mainCanvas.append("text")
                    .attr("id", FlowIdPrefixes.debugWH + cell.Id)
                    .attr("x", getDimX(cell))
                    .attr("y", getDimY(cell))
                    .text(getDimString(cell));
	    };

	    this.UpdateDebugElements = function (cell) {
	        var ophr = SVGSelectorService.GetDebugOPH(cell.Id);
	        ophr.attr("width", SVGSelectorService.GetOPHWidth(cell));
	        ophr.attr("height", SVGSelectorService.GetOPHHeight(cell));

	        var iphr = SVGSelectorService.GetDebugIPH(cell.Id);
	        iphr.attr("width", cell.Width);
	        iphr.attr("height", cell.Height);

	        var xy = SVGSelectorService.GetDebugXY(cell.Id);
	        xy.attr("x", getCoordsX(cell))
	        xy.attr("y", getCoordsY(cell))
	        xy.text(getCoordsString(cell));

	        xy = SVGSelectorService.GetDebugWH(cell.Id);
	        xy.attr("x", getDimX(cell))
	        xy.attr("y", getDimY(cell))
	        xy.text(getDimString(cell));
	    };

	    this.RemoveDebugElements = function (cell) {
	        SVGSelectorService.GetDebugOPH(cell.Id).remove();
	        SVGSelectorService.GetDebugIPH(cell.Id).remove();
	        SVGSelectorService.GetDebugXY(cell.Id).remove();
	        SVGSelectorService.GetDebugWH(cell.Id).remove();
	    };
	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGGhostService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants',

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {

	    this.RemoveVertexGhost = function () {
	        SVGSelectorService.GetMoveGhost().remove();
	        document.body.style.cursor = "auto";
	    };

	    this.AddVertexGhost = function (x, y, w, h, id) {
	        var mainCanvas = SVGSelectorService.GetMainCanvas(id);
	        mainCanvas.append("rect")
                .attr({
                    "id": FlowIdPrefixes.moveGhost,
                    "x": x,
                    "y": y,
                    "width": w,
                    "height": h,
                    "class": 'sit-flow-selection-ghost-rect'
                });
	    };

	    this.UpdateVertexGhost = function (x, y, w, h) {
	        var ghost = SVGSelectorService.GetMoveGhost();
	        ghost.attr({
	            "x": x,
	            "y": y,
	            "width": w,
	            "height": h
	        });
	    };




	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGGridService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
             "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

	function ($log, SVGSelectorService, FlowIdPrefixes, SharingService, FlowConstants) {

	    this.AddGrid = function (id, scale) {

	        if (scale == null)
	            scale = 1;

	        var rangeMin = FlowConstants.zoomMin;
	        var rangeMax = FlowConstants.zoomMax;
	        var min = SharingService.GridSize * rangeMin;
	        var max = SharingService.GridSize * rangeMax;

	        var gridScale = d3.scale.linear()
                           .domain([rangeMin, rangeMax])
                           .range([min, max]);

	        var grid = SVGSelectorService.GetGrid(id);
	        var svg = SVGSelectorService.GetSVG(id);

	        var gridSize = gridScale(scale);

	        SVGSelectorService.GetXAxis(id).remove();
	        SVGSelectorService.GetYAxis(id).remove();

	        grid.insert("g", ":first-child")
                        .attr("id", FlowIdPrefixes.xAxis + id)
                        .attr("class", "sit-flow-graph-axis")
                        .selectAll("line")
                        .data(d3.range(0, svg.attr("width"), gridSize))
                        .enter().append("line")
                        .attr("x1", function (d) { return d; })
                        .attr("y1", 0)
                        .attr("x2", function (d) { return d; })
                        .attr("y2", svg.attr("height"));

	        grid.insert("g", ":first-child")
                        .attr("id", FlowIdPrefixes.yAxis + id)
                        .attr("class", "sit-flow-graph-axis")
                        .selectAll("line")
                        .data(d3.range(0, svg.attr("height"), gridSize))
                        .enter().append("line")
                        .attr("x1", 0)
                        .attr("y1", function (d) { return d; })
                        .attr("x2", svg.attr("width"))
                        .attr("y2", function (d) { return d; });
	    };

	    this.RemoveGrid = function (id) {
	        SVGSelectorService.GetXAxis(id).remove();
	        SVGSelectorService.GetYAxis(id).remove();
	    };


	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGIconService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {

	    function clean(cell) {
	        FlowIdPrefixes.iconButtons.forEach(function (item) {
	            d3.select('#' + item + cell.Id).remove();
	        });
	    }

	    this.addIconButtons = function (cell) {
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        if (p[0][0] === null) {
	            p = SVGSelectorService.GetSelRect(cell.Id);
	        }
	        var g;
	        clean(cell);
	        if (cell.IconMenu && cell.IconMenu[0]) {
	            g = p.append("g")
                        .attr("id", FlowIdPrefixes.iconButtons[0] + cell.Id)
                        .style({ "opacity": 0, "display": "none" });


	            g.append("text")
	                   .attr("class", "sit-flow-context-button-icon")
                       .style("text-anchor", "middle")
					   .style("font-size", "18pt")
	                   .attr("x", cell.IconMenu[0].x || 222)
					   .attr("y", cell.IconMenu[0].y || 28)
					   .attr("fill", cell.IconMenu[0].bgcolor || 'red')
	                   .text(cell.IconMenu[0].icon);

	            g.append('title').text(cell.IconMenu[0].tooltip);
	        }
	        if (cell.IconMenu && cell.IconMenu[1]) {
	            g = p.append("g")
                        .attr("id", FlowIdPrefixes.iconButtons[1] + cell.Id)
                        .style({ "opacity": 0, "display": "none" });


	            g.append("text")
	                   .attr("class", "sit-flow-context-button-icon")
                       .style("text-anchor", "middle")
					   .style("font-size", "18pt")
	                   .attr("x", cell.IconMenu[1].x || 222)
					   .attr("y", cell.IconMenu[1].y || 28)
					   .attr("fill", cell.IconMenu[1].bgcolor || 'red')
	                   .text(cell.IconMenu[1].icon);

	            g.append('title').text(cell.IconMenu[1].tooltip);
	        }

	        var buttons = SVGSelectorService.getIconButtonList(cell.Id);

	        if (cell.IconMenu && cell.IconMenu.length) {
	            for (var i = 0; i < cell.IconMenu.length; i++) {
	                if (cell.IconMenu[i].showIcon) {
	                    this.showIconButtons(buttons[i]);
	                } else {
	                    this.hideIconButtons(buttons[i]);
	                }
	            }
	        }
	    };

	    this.hideIconButtons = function (button) {
	        button.transition().duration(300).style({ "opacity": 0, "display": "none" });
	    };

	    this.showIconButtons = function (button) {
	        button.transition().duration(300).style({ "opacity": 1, "display": "block" });
	    };

	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGLabelService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {

	    function clean(cell) {
	        FlowIdPrefixes.labelList.forEach(function (item) {
	            d3.select('#' + item + cell.Id).remove();
	        });
	    }

	    this.addLabel = function (cell) {
	        var p = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        if (p[0][0] === null) {
	            p = SVGSelectorService.GetSelRect(cell.Id);
	        }
	        var g;
	        clean(cell);
	        if (cell.LabelList && cell.LabelList[0]) {
	            cell.LabelList[0].labels = cell.LabelList[0].labels || [];
	            g = p.append("g")
                     .attr("id", FlowIdPrefixes.labelList[0] + cell.Id)
					 .style({ "opacity": cell.LabelList[0].showLabel ? 1 : 0 })
                    .on("mousedown", function () {
                        if (cell.MouseDown) {
                            cell.MouseDown();
                        }
                    })
					.on("mouseup", function () {
					    if (cell.MouseUp) {
					        cell.MouseUp();
					    }
					})
                    .on("mouseleave", function () {
					    if (cell.MouseUp) {
					        cell.MouseUp();
					    }
					});

	            g.append("rect")
                 .attr('x', cell.LabelList[0].x)
                 .attr('y', cell.LabelList[0].y)
                 .attr("width", cell.LabelList[0].width)
                 .attr("height", cell.LabelList[0].height)
                 .attr('fill', cell.LabelList[0].fillColor)
                 .attr('stroke-width', cell.LabelList[0].strokeWidth || 0)
                 .attr("stroke", cell.LabelList[0].strokeColor || '');

	            g.append("text")
                 .attr("fill", "white")
                 .attr('x', cell.LabelList[0].data[0].x ? cell.LabelList[0].data[0].x : 175)
                 .attr('y', cell.LabelList[0].data[0].y ? cell.LabelList[0].data[0].y : 80)
                 .attr('word-spacing', 2)
                 .style("text-anchor", "middle")
                 .style("font-size", "x-small")
                 .text(cell.LabelList[0].translationData.waitUntil + cell.LabelList[0].data[0].value);

	            //labels
	            g.append("text")
                 .attr("fill", "white")
                 .attr('x', 95)
                 .attr('y', 120)
                 .style("font-size", "x-small")
                 .text(cell.LabelList[0].translationData.Days);

	            g.append("text")
                .attr("fill", "white")
                .attr('x', 140)
                .attr('y', 120)
                .style("font-size", "x-small")
                .text(cell.LabelList[0].translationData.Hours);

	            g.append("text")
                .attr("fill", "white")
                .attr('x', 183)
                .attr('y', 120)
                .style("font-size", "x-small")
                .text(cell.LabelList[0].translationData.Minutes);

	            g.append("text")
                .attr("fill", "white")
                .attr('x', 232)
                .attr('y', 120)
                .style("font-size", "x-small")
                .text(cell.LabelList[0].translationData.Seconds);
	            //labels

	            //label values
	            //days
	            cell.LabelList[0].labels[0] = g.append("text")
                .attr("fill", "white")
                .attr('x', cell.LabelList[0].data[1].x ? cell.LabelList[0].data[1].x : 75)
                .attr('y', cell.LabelList[0].data[1].y ? cell.LabelList[0].data[1].y : 103)
                .style("font-size", "18px")

	            //hours
	            cell.LabelList[0].labels[1] = g.append("text")
                .attr("fill", "white")
                .attr('x', 142)
                .attr('y', 103)
                .style("font-size", "18px")

	            //minutes
	            cell.LabelList[0].labels[2] = g.append("text")
                .attr("fill", "white")
                .attr('x', 190)
                .attr('y', 103)
                .style("font-size", "18px")

	            //seconds
	            cell.LabelList[0].labels[3] = g.append("text")
                .attr("fill", "white")
                .attr('x', 240)
                .attr('y', 103)
                .style("font-size", "18px")
	            //label values

	            g.append('title').text(cell.LabelList[0].tooltip);
	        }

	        // calling the callback function to update the time
	        if (cell.LabelList && cell.LabelList[0] && cell.LabelList[0].update) {
	            cell.LabelList[0].update(cell.LabelList[0].labels);
	        }
	    };

	    this.hideLabel = function (button) {
	        button.transition().duration(300).style({ "opacity": 0, "display": "none" });
	    };

	    this.showLabel = function (button) {
	        button.transition().duration(300).style({ "opacity": 1, "display": "block" });
	    };

	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGPanService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',

	function ($log, SVGSelectorService, FlowIdPrefixes) {

	    this.AddPan = function (id) {
	        var svg = SVGSelectorService.GetSVG(id);

	        var pan = svg.append("rect")
                .attr(
                {
                    "id": FlowIdPrefixes.pan + id,
                    "width": svg.attr("width", 10),
                    "height": svg.attr("height", 10),
                    "fill": "transparent",
                    "style": "cursor:pointer;display:none"
                });

	        return pan;
	    };

	    this.ShowPan = function (id) {
	        var pan = SVGSelectorService.GetPan(id);
	        pan.style("display","block");
	    };

	    this.HidePan = function (id) {
	        var pan = SVGSelectorService.GetPan(id);
	        pan.style("display","none");
	    };
	}]);
}());


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGPlaceholderService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes",
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGResizeService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGDebugService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectionService",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGAnchorService",
	function ($log, FlowConstants, FlowIdPrefixes, SharingService,
        SVGSelectorService, SVGResizeService, SVGDebugService, SVGSelectionService, SVGAnchorService) {


	    /////////////////////// VERTEX PLACEHOLDER


	    this.CreatePlaceholder = function (mainCanvas, cell) {
	        var ph = mainCanvas.append("svg")
                .attr({
                    "id": FlowIdPrefixes.oph + cell.Id,
                    "width": cell.OuterWidth || SVGSelectorService.GetOPHWidth(cell),
                    "height": cell.OuterHeight || SVGSelectorService.GetOPHHeight(cell),
                    "x": SVGSelectorService.GetOPHX(cell),
                    "y": SVGSelectorService.GetOPHY(cell)
                });

	        if (SharingService.Debug) {
	            SVGDebugService.AddDebugElements(mainCanvas, ph, cell);
	        }

	        SVGSelectionService.AddSelectors(cell);
	        SVGAnchorService.AddLinkRect(cell);
	        SVGResizeService.AddResizers(cell);

	        ph.append("svg")
               .attr("id", FlowIdPrefixes.iph + cell.Id)
               .attr("width", cell.Width)
               .attr("height", cell.Height)
               .attr("x", FlowConstants.innerPlaceholderGap)
               .attr("y", FlowConstants.innerPlaceholderGap);

	    };

	    this.CleanPlaceholder = function (cell) {
	        var ph = SVGSelectorService.GetVertexInnerPh(cell.Id);
	        ph.each(function (d, i) { var children = d3.selectAll(this.childNodes).remove(); });
	    }

	    this.UpdatePlaceholder = function (cell) {
	        var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);
	        ph.attr("width", cell.OuterWidth || SVGSelectorService.GetOPHWidth(cell))
	        ph.attr("height", cell.OuterHeight || SVGSelectorService.GetOPHHeight(cell))
	        ph.attr("x", SVGSelectorService.GetOPHX(cell))
	        ph.attr("y", SVGSelectorService.GetOPHY(cell));

	        var p = SVGSelectorService.GetVertexInnerPh(cell.Id);
	        p.attr("width", cell.Width);
	        p.attr("height", cell.Height);

	        SVGSelectionService.UpdateSelectors(cell);
	        SVGResizeService.UpdateResizers(cell);
	        SVGAnchorService.UpdateAnchor(cell);
	        SVGAnchorService.UpdateLinkRect(cell);

	        if (SharingService.Debug) {
	            SVGDebugService.UpdateDebugElements(cell);
	        }
	    };
	}]);
}());



(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGResizeService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants) {

	    function getResizeGap() {
	        return FlowConstants.innerPlaceholderGap - FlowConstants.resizeRectGap;
	    }

	    function createRect(ph, id, w, h, x, y, fill, cursor) {
	        var opacity = 0;
	        ph.append("rect")
            .attr({
                "id": id,
                "width": w,
                "height": h,
                "x": x,
                "y": y,
                "style": "stroke:transparent;stroke-width:3;fill:" + fill + "; cursor:" + cursor + "; opacity:" + opacity
            })
                .append('title')
                .html("Resize vertex");
	    }

	    this.AddResizers = function (cell) {
	        if (cell.HResizable || cell.VResizable) {

	            var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);

	            var op = 0;

	            if (cell.VResizable) {
	                createRect(
                        ph,
                        FlowIdPrefixes.bottom + cell.Id,
                        cell.Width - FlowConstants.resizeRectDimension,
                        FlowConstants.resizeRectDimension,
                        getResizeGap() + FlowConstants.resizeRectDimension,
                        getResizeGap() + cell.Height - FlowConstants.resizeRectDimension + +FlowConstants.resizeRectGap * 2,
                        "green",
                        "n-resize");

	                createRect(
                        ph,
                        FlowIdPrefixes.top + cell.Id,
                        cell.Width - FlowConstants.resizeRectDimension * 2 + FlowConstants.resizeRectGap * 2,
                        FlowConstants.resizeRectDimension,
                        getResizeGap() + FlowConstants.resizeRectDimension,
                        getResizeGap(),
                        "pink",
                        "n-resize");
	            }

	            if (cell.HResizable) {
	                createRect(
                        ph,
                        FlowIdPrefixes.right + cell.Id,
                        FlowConstants.resizeRectDimension,
                        cell.Height - FlowConstants.resizeRectDimension,
                        getResizeGap() + cell.Width - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2,
                        getResizeGap() + FlowConstants.resizeRectDimension,
                        "red",
                        "e-resize");

	                if (cell.BigBlockType != 4) {
	                    createRect(
                            ph,
                            FlowIdPrefixes.left + cell.Id,
                            FlowConstants.resizeRectDimension,
                            cell.Height - FlowConstants.resizeRectDimension * 2 + FlowConstants.resizeRectGap * 2,
                            getResizeGap(),
                            getResizeGap() + FlowConstants.resizeRectDimension,
                            "azure",
                            "e-resize");
	                }
	            }

	            if (cell.VResizable && cell.HResizable) {
	                createRect(
                       ph,
                       FlowIdPrefixes.rb_corner + cell.Id,
                        FlowConstants.resizeRectDimension,
                        FlowConstants.resizeRectDimension,
                        getResizeGap() + cell.Width - FlowConstants.resizeRectDimension + +FlowConstants.resizeRectGap * 2,
                        getResizeGap() + cell.Height - FlowConstants.resizeRectDimension + +FlowConstants.resizeRectGap * 2,
                        "cyan",
                        "nw-resize");

	                createRect(
                       ph,
                       FlowIdPrefixes.lb_corner + cell.Id,
                       FlowConstants.resizeRectDimension,
                       FlowConstants.resizeRectDimension,
                       getResizeGap(),
                       getResizeGap() + cell.Height - FlowConstants.resizeRectDimension + +FlowConstants.resizeRectGap * 2,
                       "orange", "ne-resize");

	                createRect(
                        ph,
                        FlowIdPrefixes.lt_corner + cell.Id,
                        FlowConstants.resizeRectDimension,
                        FlowConstants.resizeRectDimension,
                        getResizeGap(),
                        getResizeGap(),
                        "lime", "nw-resize");

	                createRect(
                        ph,
                        FlowIdPrefixes.rt_corner + cell.Id,
                        FlowConstants.resizeRectDimension,
                        FlowConstants.resizeRectDimension,
                        getResizeGap() + cell.Width - FlowConstants.resizeRectDimension + +FlowConstants.resizeRectGap * 2,
                        getResizeGap(),
                        "gold", "ne-resize");
	            }
	        }
	    };

	    this.UpdateResizers = function (cell) {

	        var r = SVGSelectorService.GetRightResizeRect(cell.Id);
	        r.attr("height", cell.Height - FlowConstants.resizeRectDimension);
	        r.attr("x", getResizeGap() + cell.Width - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2)

	        var b = SVGSelectorService.GetBottomResizeRect(cell.Id);
	        b.attr("width", cell.Width - FlowConstants.resizeRectDimension * 2 + FlowConstants.resizeRectGap * 2);
	        b.attr("y", getResizeGap() + cell.Height - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2)

	        b = SVGSelectorService.GetTopResizeRect(cell.Id);
	        b.attr("width", cell.Width - FlowConstants.resizeRectDimension * 2 + FlowConstants.resizeRectGap * 2);
	        b.attr("y", getResizeGap())

	        var c = SVGSelectorService.GetRBCornerResizeRect(cell.Id);
	        c.attr("x", getResizeGap() + cell.Width - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2)
	        c.attr("y", getResizeGap() + cell.Height - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2)

	        c = SVGSelectorService.GetRTCornerResizeRect(cell.Id);
	        c.attr("x", getResizeGap() + cell.Width - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2)

	        c = SVGSelectorService.GetLBCornerResizeRect(cell.Id);
	        c.attr("y", getResizeGap() + cell.Height - FlowConstants.resizeRectDimension + FlowConstants.resizeRectGap * 2)

	        r = SVGSelectorService.GetLeftResizeRect(cell.Id);
	        r.attr("height", cell.Height - FlowConstants.resizeRectDimension * 2 + FlowConstants.resizeRectGap * 2);
	    };

	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGSelectionService",
        ["$log", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.model.Vertex",
            "siemens.simaticit.common.widgets.flowEditor.model.Edge",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGContextMenuService",

	function ($log, SVGSelectorService, FlowIdPrefixes, FlowConstants, Vertex, Edge, SVGContextMenuService) {

	    this.AddSelectors = function (cell) {

	        var ph = SVGSelectorService.GetVertexOuterPh(cell.Id);

	        ph.append("rect").attr(
            {
                "id": FlowIdPrefixes.selrect + cell.Id,
                "width": SVGSelectorService.GetSelRectWidth(cell),
                "height": SVGSelectorService.GetSelRectHeight(cell),
                "x": SVGSelectorService.GetSelRectPos(cell),
                "y": SVGSelectorService.GetSelRectPos(cell),
                "class": 'sit-flow-selection-rect'
            })
	        .style("opacity", 0);


	    };

	    this.UpdateSelectors = function (cell) {
	        var sr = SVGSelectorService.GetSelRect(cell.Id);
	        sr.attr("width", SVGSelectorService.GetSelRectWidth(cell));
	        sr.attr("height", SVGSelectorService.GetSelRectHeight(cell));
	    };

	    this.ToggleSelection = function (cell) {
	        var rect;
	        var wayPoints;
	        if (cell instanceof Vertex) {
	            rect = SVGSelectorService.GetSelRect(cell.Id);
	            if (cell.IsSelected) {
	                if (cell.ContextMenu) {
	                    SVGContextMenuService.showContextMenuButtons(cell);
	                }

	                rect.style("opacity", 1);
	            }
	            else {
	                rect.style("opacity", 0);
	                SVGContextMenuService.hideContextMenuButtons(cell);
	                $('#workflow-context-menu').css('display', 'none');
	            }
	        }

	        if (cell instanceof Edge) {
	            var edge = SVGSelectorService.GetEdge(cell.Id);
	            rect = SVGSelectorService.GetSelRect(cell.Id);
	            wayPoints = SVGSelectorService.GetEdgeWaypoints(cell.Id);
	            var rp = SVGSelectorService.GetEdgeRoutePoints(cell.Id);
	            if (cell.IsSelected) {
	                rp.style("opacity", "1")
	                rect.style("opacity", 1);
	                edge.classed('sit-flow-selected-edge', true);
	                wayPoints.style("opacity", 1);
	                wayPoints.style("zIndex", 1000);
	                SVGContextMenuService.showContextMenuButtons(cell);
	            }
	            else {
	                edge.classed('sit-flow-selected-edge', false);
	                rp.style("opacity", "0.01")
	                wayPoints.style("opacity", 0);
	                rect.style("opacity", 0);
	                SVGContextMenuService.hideContextMenuButtons(cell);
	            }
	        }
	    };

	}]);
}());

(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .service("siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
        ["$log", 'siemens.simaticit.common.widgets.flowEditor.constants.FlowIdPrefixes',
            'siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants',

	function ($log, FlowIdPrefixes, FlowConstants) {

	    function selectAllById(ids) {
	        var elements = [];
	        ids.forEach(function (item) {
	            elements.push(selectById(item))
	        });
	        if (elements.length > 0)
	            return elements;
	        else
	            return null;
	    }

	    function selectById(id) {
	        var x = d3.select(FlowIdPrefixes.hash + id);
	        if (x.length > 0)
	            return x;
	        else
	            return null;
	    }

	    function select(id) {
	        var x = d3.select(id);
	        if (x.length > 0)
	            return x;
	        else
	            return null;
	    }

	    function GetCandidateParent(mainCanvas, myx, myy, myw, myh, sid) {
	        var elems = mainCanvas.selectAll("svg").filter(function () {

	            var el = select(this);

	            var brx = myx + myw;
	            var bry = myy + myh;

	            var x = parseInt(el.attr("x"), 10) + FlowConstants.innerPlaceholderGap;
	            var y = parseInt(el.attr("y"), 10) + FlowConstants.innerPlaceholderGap;
	            var w = parseInt(el.attr("width"), 10) - FlowConstants.innerPlaceholderGap * 2;
	            var h = parseInt(el.attr("height"), 10) - FlowConstants.innerPlaceholderGap * 2;
	            var id = el.attr("id");
	            if (sid)
	                return myx >= x && myy >= y && myx <= x + w && myy <= y + h &&
                           brx >= x && bry >= y && brx <= x + w && bry <= y + h &&
                        id.startsWith(FlowIdPrefixes.oph) && id.safeReplace(FlowIdPrefixes.oph, '') !== sid;
	            else
	                return myx >= x && myy >= y && myx <= x + w && myy <= y + h &&
                           brx >= x && bry >= y && brx <= x + w && bry <= y + h && id.startsWith(FlowIdPrefixes.oph);
	        });
	        var max;
	        for (var i = 0; i < elems[0].length; i++) {
	            var el = elems[0][i];
	            if (max == null)
	                max = el;
	            else if ($(el).index() > $(max).index())
	                max = el;
	        }
	        return select(max);
	    }

	    function GetCandidateChildren(mainCanvas, myx, myy, myw, myh, sid) {
	        var elems = mainCanvas.selectAll("svg").filter(function () {

	            var el = select(this);
	            var brx = myx + myw - FlowConstants.innerPlaceholderGap * 2;
	            var bry = myy + myh - FlowConstants.innerPlaceholderGap * 2;
	            // coordinate e dimensioni dell'elemento che sto filtrando in questo momento
	            var x = parseInt(el.attr("x"), 10) + FlowConstants.innerPlaceholderGap;
	            var y = parseInt(el.attr("y"), 10) + FlowConstants.innerPlaceholderGap;
	            var w = parseInt(el.attr("width"), 10) - FlowConstants.innerPlaceholderGap * 2;
	            var h = parseInt(el.attr("height"), 10) - FlowConstants.innerPlaceholderGap * 2;
	            var id = el.attr("id");
	            if (sid)
	                return myx < x && myy < y && myx < (x + w) && (x + w) < (myx + myw) && myy < (y + h) && (y + h) < (myy + myh) &&
                       //   brx > x && bry > y && (x + w) < brx && (y + h) < bry &&
                        id.startsWith(FlowIdPrefixes.oph) && id.safeReplace(FlowIdPrefixes.oph, '') !== sid;
	            else
	                return myx < x && myy < y && myx < (x + w) && (x + w) < (myx + myw) && myy < (y + h) && (y + h) < (myy + myh) &&
                         //  brx > x && bry > y && (x + w) < brx && (y + h) < bry &&
                           id.startsWith(FlowIdPrefixes.oph);

	        });
	        var elements = [];
	        for (var i = 0; i < elems[0].length; i++) {
	            var el = elems[0][i];
	            elements.push(select(el));
	        }
	        return elements;
	    }

	    function getDim(node) {
	        if (node && node.clientWidth != 0) {
	            return [node.clientWidth, node.clientHeight];
	        }
	        else {
	            return getDim(node.parentNode);
	        }
	    }

	    function starts(input, prefix) {
	        return (prefix == input.substring(0, prefix.length))

	    }

	    this.GetCandidateChildrenFromCell = function (graphService, cell) {
	        var children = [];
	        var childrenId = this.GetCandidateChildrenIdFromCell(graphService.MainCanvas, cell);
	        for (var i = 0; i < childrenId.length; i++) {
	            var ch = graphService.GetCellById(childrenId[i]);
	            children.push(ch);
	        }
	        return children;
	    };

	    this.GetCandidateParentFromCell = function (graphService, cell) {
	        var parent = null;
	        var parentId = this.GetCandidateParentIdFromCell(graphService.MainCanvas, cell);
	        if (parentId) {
	            var cp = graphService.GetCellById(parentId);
	            if (cp.CanHaveChildren)
	                parent = cp;
	        }
	        return parent;
	    };

	    this.GetCandidateParent = function (graphService, x, y, w, h) {
	        var parent = null;
	        var parentId = this.GetCandidateParentId(graphService.MainCanvas, x, y, w, h);
	        if (parentId) {
	            var cp = graphService.GetCellById(parentId);
	            if (cp.CanHaveChildren)
	                parent = cp;
	        }
	        return parent;
	    };

	    this.GetCandidateChildren = function (graphService, x, y, w, h) {
	        var children = [];
	        var childrenId = this.GetCandidateChildrenId(graphService.MainCanvas, x, y, w, h);
	        for (var i = 0; i < childrenId.length; i++) {
	            var ch = graphService.GetCellById(childrenId[i]);
	            children.push(ch);
	        }
	        return children;

	    };

	    this.MoveOnTop = function (cell, mainCanvas) {

	        var ph = this.GetVertexOuterPh(cell.Id);
	        if (ph[0] && ph[0][0] != null) {
	            ph.remove();
	            mainCanvas.append(function () {
	                return ph.node();
	            });
	            this.MoveEdgesOnTop(cell.Incoming, mainCanvas);
	            this.MoveEdgesOnTop(cell.Outgoing, mainCanvas);
	        }

	    };

	    this.MoveEdgesOnTop = function (edges, mainCanvas) {
	        for (var i = 0; i < edges.length; i++) {
	            var ph = this.GetEdge(edges[i].Id);
	            ph.remove();
	            mainCanvas.append(function () {
	                return ph.node();
	            });
	            //FMA usability
	            var phw = this.GetEdgeWrapper(edges[i].Id);
	            if (phw[0][0] != null) {
	                phw.remove();
	                mainCanvas.append(function () {
	                    return phw.node();
	                });
	            }
	        }
	    };

	    this.GetCandidateParentIdFromCell = function (mainCanvas, cell) {
	        var elements = GetCandidateParent(mainCanvas, cell.X, cell.Y, cell.Width, cell.Height, cell.Id);
	        if (elements.node() != null) {
	            var id = this.GetId(elements);
	            if (id != null) {
	                return id;
	            }
	        }
	    };

	    this.GetCandidateChildrenIdFromCell = function (mainCanvas, cell) {
	        var ids = [];
	        var elements = GetCandidateChildren(mainCanvas, cell.X, cell.Y, cell.Width, cell.Height, cell.Id);
	        for (var i = 0; i < elements.length; i++) {
	            if (elements[i].node() != null) {
	                var id = this.GetId(elements[i]);
	                if (id != null) {
	                    ids.push(id);
	                }
	            }
	        }
	        return ids;

	    };

	    this.GetCandidateParentId = function (mainCanvas, x, y, w, h) {
	        var elements = GetCandidateParent(mainCanvas, x, y, w, h);
	        if (elements.node() != null) {
	            var id = this.GetId(elements);
	            if (id != null) {
	                return id;
	            }
	        }
	    };

	    this.GetCandidateChildrenId = function (mainCanvas, x, y, w, h) {
	        var elements = GetCandidateChildren(mainCanvas, x, y, w, h);
	        var ids = [];
	        for (var i = 0; i < elements.length; i++) {
	            if (elements[i].node() != null) {
	                var id = this.GetId(elements[i]);
	                if (id != null) {
	                    ids.push(id);
	                }
	            }
	        }
	        return ids;
	    };

	    this.GetVertexFromPoint = function (mainCanvas, mx, my) {
	        var elems = mainCanvas.selectAll("svg").filter(function () {

	            var el = select(this);

	            var x = parseInt(el.attr("x"), 10);
	            var y = parseInt(el.attr("y"), 10);
	            var w = parseInt(el.attr("width"), 10);
	            var h = parseInt(el.attr("height"), 10);
	            var id = el.attr("id");

	            return mx > x && my > y && mx < x + w && my < y + h && id.startsWith(FlowIdPrefixes.oph);

	        });
	        var max;
	        for (var i = 0; i < elems[0].length; i++) {
	            var el = elems[0][i];
	            if (max == null)
	                max = el;
	            else if ($(el).index() > $(max).index())
	                max = el;
	        }
	        return select(max);
	    };

	    this.GetFirstEdgeId = function (elements) {
	        for (var i = 0; i < elements.length; i++) {
	            var e = elements[i];
	            e = select(e);
	            var id = e.attr("id")
	            if (id == null)
	                continue;
	            if (id.startsWith(FlowIdPrefixes.edge))
	                return this.GetId(e);
	        }
	    };

	    this.GetOPHWidth = function (cell) {
	        return cell.Width + FlowConstants.innerPlaceholderGap * 2;
	    };

	    this.GetOPHHeight = function (cell) {
	        return cell.Height + FlowConstants.innerPlaceholderGap * 2;
	    };

	    this.GetOPHX = function (cell) {
	        return cell.X - FlowConstants.innerPlaceholderGap;
	    };

	    this.GetOPHY = function (cell) {
	        return cell.Y - FlowConstants.innerPlaceholderGap;
	    };

	    this.GetSelRectWidth = function (cell) {
	        return cell.Width + FlowConstants.selectionRectGap * 2;
	    };

	    this.GetSelRectHeight = function (cell) {
	        return cell.Height + FlowConstants.selectionRectGap * 2;
	    };

	    this.GetSelRectPos = function (cell) {
	        return FlowConstants.innerPlaceholderGap - FlowConstants.selectionRectGap;
	    };

	    this.GetLinkRectWidth = function (cell) {
	        return cell.Width + FlowConstants.linkRectGap * 2;
	    };

	    this.GetLinkRectHeight = function (cell) {
	        return cell.Height + FlowConstants.linkRectGap * 2;
	    };

	    this.GetLinkRectPos = function (cell) {
	        return FlowConstants.innerPlaceholderGap - FlowConstants.linkRectGap;
	    };

	    this.GetXAxis = function (id) {
	        return selectById(FlowIdPrefixes.xAxis + id);
	    };

	    this.GetYAxis = function (id) {
	        return selectById(FlowIdPrefixes.yAxis + id);
	    };

	    this.GetGhost = function () {
	        return selectById(FlowIdPrefixes.ghost);
	    };

	    this.GetMoveGhost = function () {
	        return selectById(FlowIdPrefixes.moveGhost);
	    };

	    this.GetResizeMode = function (element) {
	        return select(element).attr("id");
	    };

	    this.GetVertexIdFromNode = function (node) {
	        var innerPh = select(node);
	        return this.GetId(innerPh);
	    };

	    this.GetMainCanvasMousePosition = function (mainCanvas) {
	        return d3.mouse(mainCanvas.node());
	    };

	    this.GetMainCanvas = function (id) {
	        return selectById(FlowIdPrefixes.canvas + id);
	    };

	    this.GetSVG = function (id) {
	        return selectById(FlowIdPrefixes.svg + id);
	    };

	    this.GetPan = function (id) {
	        return selectById(FlowIdPrefixes.pan + id);
	    };

	    this.GetGrid = function (id) {
	        return selectById(FlowIdPrefixes.grid + id);
	    };

	    this.GetGraph = function (id) {
	        return selectById(id);
	    };

	    this.GetGraphContainerDimensions = function (id) {
	        return getDim(this.GetGraph(id).node().parentNode);
	    };

	    this.GetPZOverlay = function (id) {
	        return selectById(FlowIdPrefixes.overlay + id);
	    };

	    this.GetLinkRect = function (id) {
	        return selectById(FlowIdPrefixes.linkrect + id);
	    };

	    this.GetVertexOuterPh = function (id) {
	        return selectById(FlowIdPrefixes.oph + id);
	    };

	    this.GetVertexInnerPh = function (id) {
	        return selectById(FlowIdPrefixes.iph + id);
	    };

	    this.GetBottomResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.bottom + id);
	    };
	    this.GetRightResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.right + id);
	    };
	    this.GetLeftResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.left + id);
	    };
	    this.GetTopResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.top + id);
	    };

	    this.GetRBCornerResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.rb_corner + id);
	    };

	    this.GetRTCornerResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.rt_corner + id);
	    };
	    this.GetLTCornerResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.lt_corner + id);
	    };
	    this.GetLBCornerResizeRect = function (id) {
	        return selectById(FlowIdPrefixes.lb_corner + id);
	    };

	    this.getContextMenuButtons = function (id) {
	        return selectAllById((FlowIdPrefixes.contextMenuButtons.join(id + ',') + id).split(','));
	    };

	    this.getIconButtonList = function (id) {
	        return selectAllById((FlowIdPrefixes.iconButtons.join(id + ',') + id).split(','));
	    };

	    this.GetCustomAnchor = function (id) {
	        return select(FlowIdPrefixes.hash + FlowIdPrefixes.customAnchor + id);
	    };

	    this.GetRightAnchor = function (id) {
	        return select(FlowIdPrefixes.hash + FlowIdPrefixes.right_anchor + id);
	    };

	    this.GetBottomAnchor = function (id) {
	        return select(FlowIdPrefixes.hash + FlowIdPrefixes.bottom_anchor + id);
	    };

	    this.GetLeftAnchor = function (id) {
	        return select(FlowIdPrefixes.hash + FlowIdPrefixes.left_anchor + id);
	    };

	    this.GetTopAnchor = function (id) {
	        return select(FlowIdPrefixes.hash + FlowIdPrefixes.top_anchor + id);
	    };

	    this.GetRenameButton = function (id) {
	        return selectById(FlowIdPrefixes.renamebutton + id);
	    };

	    this.GetConfigButton = function (id) {
	        return selectById(FlowIdPrefixes.configbutton + id);
	    };
	    this.GetDeleteButton = function (id) {
	        return selectById(FlowIdPrefixes.deletebutton + id);
	    };

	    this.GetEdge = function (id) {
	        return selectById(FlowIdPrefixes.edge + id);
	    };

	    //FMA usability
	    this.GetEdgeWrapper = function (id) {
	        return selectById(FlowIdPrefixes.edgewrap + id);
	    };

	    this.GetEdgeRoutePoints = function (id, index) {
	        if (index)
	            return selectById(FlowIdPrefixes.edgeRoute + id + "_" + index);
	        else
	            return d3.selectAll("[id^=" + FlowIdPrefixes.edgeRoute + id + '_]');
	    };

	    this.GetEdgeLabel = function (id) {
	        return selectById(FlowIdPrefixes.edgeLabel + id);
	    };

	    this.GetPlaceholder = function (id) {
	        return selectById(FlowIdPrefixes.iph + id);
	    };

	    this.GetAllInsidePlaceholder = function (id) {
	        return d3.selectAll(FlowIdPrefixes.iph + id + "> * ");
	    }

	    this.GetDebugOPH = function (id) {
	        return selectById(FlowIdPrefixes.debugOPH + id);
	    };

	    this.GetMovingWayPoint = function () {
	        return selectById("movingWayPoint");
	    };

	    this.GetEdgeWaypoints = function (id) {
	        return selectById("_wayPoints" + id);
	    };

	    this.GetSelRect = function (id) {
	        return selectById(FlowIdPrefixes.selrect + id);
	    };

	    this.GetSelEdgeLabel = function (id) {
	        return selectById(FlowIdPrefixes.edgeLabel + id);
	    };

	    this.GetSelEdgeToken = function (id) {
	        return selectById('edge_token_' + id);
	    };

	    this.GetAligner = function (id) {
	        var x = d3.selectAll(FlowIdPrefixes.hash + FlowIdPrefixes.aligner + id);
	        return x;
	    };

	    this.GetDebugIPH = function (id) {
	        return selectById(FlowIdPrefixes.debugIPH + id);
	    };

	    this.GetDebugXY = function (id) {
	        return selectById(FlowIdPrefixes.debugXY + id);
	    };

	    this.GetDebugWH = function (id) {
	        return selectById(FlowIdPrefixes.debugWH + id);
	    };

	    this.GetId = function (element) {
	        var id = element.attr("id")

	        if (id == null)
	            return null;

	        if (starts(id, FlowIdPrefixes.oph))
	            return id.safeReplace(FlowIdPrefixes.oph, '');

	        if (starts(id, FlowIdPrefixes.iph))
                return id.safeReplace(FlowIdPrefixes.iph, '');

	        if (starts(id, FlowIdPrefixes.edgeRoute))
                return id.safeReplace(FlowIdPrefixes.edgeRoute, '');

	        if (starts(id, FlowIdPrefixes.edge))
                return id.safeReplace(FlowIdPrefixes.edge, '');

	        //FMA usability
	        if (starts(id, FlowIdPrefixes.edgewrap))
                return id.safeReplace(FlowIdPrefixes.edgewrap, '');

	        if (starts(id, FlowIdPrefixes.right_anchor))
                return id.safeReplace(FlowIdPrefixes.right_anchor, '');

	        if (starts(id, FlowIdPrefixes.left_anchor))
                return id.safeReplace(FlowIdPrefixes.left_anchor, '');

	        if (starts(id, FlowIdPrefixes.top_anchor))
                return id.safeReplace(FlowIdPrefixes.top_anchor, '');

	        if (starts(id, FlowIdPrefixes.bottom_anchor))
                return id.safeReplace(FlowIdPrefixes.bottom_anchor, '');

	        if (starts(id, FlowIdPrefixes.right))
                return id.safeReplace(FlowIdPrefixes.right, '');

	        if (starts(id, FlowIdPrefixes.bottom))
                return id.safeReplace(FlowIdPrefixes.bottom, '');

	        if (starts(id, FlowIdPrefixes.left))
                return id.safeReplace(FlowIdPrefixes.left, '');

	        if (starts(id, FlowIdPrefixes.top))
                return id.safeReplace(FlowIdPrefixes.top, '');

	        if (starts(id, FlowIdPrefixes.rb_corner))
                return id.safeReplace(FlowIdPrefixes.rb_corner, '');

	        if (starts(id, FlowIdPrefixes.lt_corner))
                return id.safeReplace(FlowIdPrefixes.lt_corner, '');

	        if (starts(id, FlowIdPrefixes.lb_corner))
                return id.safeReplace(FlowIdPrefixes.lb_corner, '');

	        if (starts(id, FlowIdPrefixes.rt_corner))
                return id.safeReplace(FlowIdPrefixes.rt_corner, '');

	        if (starts(id, FlowIdPrefixes.renamebutton))
                return id.safeReplace(FlowIdPrefixes.renamebutton, '');

	        if (starts(id, FlowIdPrefixes.contextMenuButtons[0]))
                return id.safeReplace(FlowIdPrefixes.contextMenuButtons[0], '');
	        if (starts(id, FlowIdPrefixes.contextMenuButtons[1]))
                return id.safeReplace(FlowIdPrefixes.contextMenuButtons[1], '');
	        if (starts(id, FlowIdPrefixes.contextMenuButtons[2]))
                return id.safeReplace(FlowIdPrefixes.contextMenuButtons[2], '');
	        if (starts(id, FlowIdPrefixes.contextMenuButtons[3]))
                return id.safeReplace(FlowIdPrefixes.contextMenuButtons[3], '');
	        if (starts(id, FlowIdPrefixes.contextMenuButtons[4]))
                return id.safeReplace(FlowIdPrefixes.contextMenuButtons[4], '');

	        if (starts(id, FlowIdPrefixes.customAnchor))
                return id.safeReplace(FlowIdPrefixes.customAnchor, '');
	    };

	}]);
}());


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.SelectionService",
        ["$log", "$interval", "$timeout", "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectionService",
	function ($log, $interval, $timeout, SVGSelectionService) {


	    var SelectionService = function (scope, onSelectionChanged) {

	        var ss = this;
	        ss.onSelectionChanged = onSelectionChanged;

	        this.SelectedCells = new Array();

	        var commit = function () {
	            $timeout(function () {
	                if (ss.onSelectionChanged)
	                    ss.onSelectionChanged(ss.SelectedCells);
	                $log.debug("[SetSelected] executed")
	            }, 100);
	        };

	        this.SetSelected = function (cells) {
	            if (cells && cells.length > 0) {
	                for (var i = 0; i < cells.length; i++) {
	                    var cell = cells[i];
	                    //FMA
	                    if (cell.IsSelected)
	                        return;
	                    if (cell.Selectable == null || cell.Selectable) {
	                        cell.IsSelected = true;
	                        if (this.SelectedCells.indexOf(cell) === -1) {
	                            this.SelectedCells.push(cell);
	                        }
	                        SVGSelectionService.ToggleSelection(cell);
	                    }
	                }
	                commit();
	            }
	        };

	        //-- FMA ----------------------------
	        this.SetUnSelected = function (cells) {
	            if (cells && cells.length > 0) {
	                for (var i = 0; i < cells.length; i++) {
	                    var cell = cells[i];
	                    for (var j = 0; j < this.SelectedCells.length; j++) {
	                        if (this.SelectedCells[j].Id == cell.Id) {
	                            if ((cell.Selectable == null || cell.Selectable) && cell.IsSelected) {
	                                cell.IsSelected = false;
	                                this.SelectedCells.splice(j, 1);
	                                SVGSelectionService.ToggleSelection(cell);
	                                break;
	                            }
	                        }
	                    }
	                }
	                commit();
	            }
	        };
	        //------------------------------

	        this.ClearSelection = function () {
	            if (this.SelectedCells.length > 0) {
	                for (var i = 0; i < this.SelectedCells.length; i++) {
	                    var cell = this.SelectedCells[i];
	                    if (cell != null) {
	                        cell.IsSelected = false;
	                        SVGSelectionService.ToggleSelection(cell);
	                    }
	                }
	                this.SelectedCells = new Array();
	            }
	        };



	    };

	    return SelectionService;
	}]);
}());


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.SharingService", ["$log",
	function ($log) {

	    var SharingService = function () {

	        this.Id;
	        this.Label;
	        this.Arguments;
	        this.Debug = false;
	        this.MoveMode = "full";
	        this.ResizeMode = "full";
	        this.GridSize = 10;
	    };

	    return SharingService;
	}]);
}());


(function () {
    'use strict';

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.ToolsService",
        ["$log",
            "siemens.simaticit.common.widgets.flowEditor.services.PluginService",
            "siemens.simaticit.common.widgets.flowEditor.constants.FlowConstants",
            "siemens.simaticit.common.widgets.flowEditor.services.SVGSelectorService",
            "siemens.simaticit.common.widgets.flowEditor.services.SharingService",
	function ($log, PluginService, FlowConstants, SVGSelectorService, SharingService) {

	    var ToolsService = function (graphService, selectionService, mainCanvas, scope) {

	        var minHeight = FlowConstants.initialHeight;
	        var minWidth = FlowConstants.initialWidth;
	        var sharingService = new SharingService();

	        this.ShowGrid = scope.isShowGrid();
	        this.SnapToGrid = true;
	        this.ShowPan = false;

	        this.SnapOnResize = function (w, h) {
	            if (this.SnapToGrid) {
	                var gridSize = sharingService.GridSize / 2;
	                var a = w / gridSize;
	                var decPart = parseFloat("0." + (a + "").split(".")[1]);
	                if (decPart > 0.5)
	                    w = w + gridSize * (1 - decPart);
	                else
	                    w = w - gridSize * decPart;

	                a = h / gridSize;
	                decPart = parseFloat("0." + (a + "").split(".")[1]);
	                if (decPart > 0.5)
	                    h = h + gridSize * (1 - decPart);
	                else
	                    h = h - gridSize * decPart;
	            }

	            return [w, h];

	        };

	        this.SnapOnMove = function (x, y) {
	            if (this.SnapToGrid) {
	                var gridSize = sharingService.GridSize / 2;

	                var a = x / gridSize;
	                var decPart = parseFloat("0." + (a + "").split(".")[1]);
	                if (decPart >= 0.5)
	                    x = x + gridSize * (1 - decPart);
	                else
	                    x = x - gridSize * decPart;

	                a = y / gridSize;
	                decPart = parseFloat("0." + (a + "").split(".")[1]);
	                if (decPart >= 0.5)
	                    y = y + gridSize * (1 - decPart);
	                else
	                    y = y - gridSize * decPart;
	            }

	            return [x, y];
	        };

	        this.GetSelectedCells = function () {
	            return selectionService.SelectedCells[0];
	        };

	        this.GetAllSelectedCells = function () {
	            return selectionService.SelectedCells;
	        };

	        this.UpdateEdges = function (cell) {
	            var edge, e, ew, r, rect, label, token;
	            var wp;
	            for (var i = 0; i < cell.Outgoing.length; i++) {

	                edge = cell.Outgoing[i];
	                edge.Source = cell;
	                e = SVGSelectorService.GetEdge(edge.Id);
	                e.remove(e);
	                //FMA usability
	                ew = SVGSelectorService.GetEdgeWrapper(edge.Id);
	                ew.remove(ew);
	                //-------------------------

	                wp = SVGSelectorService.GetEdgeWaypoints(edge.Id);
	                wp.remove(wp);

	                r = SVGSelectorService.GetEdgeRoutePoints(edge.Id);
	                r.remove(r);
	                rect = SVGSelectorService.GetSelRect(edge.Id);
	                rect.remove(rect);
	                label = SVGSelectorService.GetSelEdgeLabel(edge.Id)
	                label.remove(label);
	                token = SVGSelectorService.GetSelEdgeToken(edge.Id)
	                token.remove(token);
	                //DECOMMENT
	                PluginService.DrawEdge(edge, mainCanvas);
	            }
	            for (i = 0; i < cell.Incoming.length; i++) {

	                edge = cell.Incoming[i];
	                edge.Target = cell;
	                e = SVGSelectorService.GetEdge(edge.Id);
	                e.remove(e);
	                //FMA usability
	                ew = SVGSelectorService.GetEdgeWrapper(edge.Id);
	                ew.remove();
	                //-------------------------
	                r = SVGSelectorService.GetEdgeRoutePoints(edge.Id);
	                r.remove(r);

	                rect = SVGSelectorService.GetSelRect(edge.Id);
	                rect.remove(rect);
	                label = SVGSelectorService.GetSelEdgeLabel(edge.Id)
	                label.remove(label);

	                token = SVGSelectorService.GetSelEdgeToken(edge.Id)
	                token.remove(token);
	                //DECOMMENT
	                wp = SVGSelectorService.GetEdgeWaypoints(edge.Id);
	                wp.remove(wp);
	                PluginService.DrawEdge(edge, mainCanvas);
	            }
	        };

	        this.Select = function (cell) {
	            if (cell != null) {
	                selectionService.SetSelected([cell]);
	            }
	        };

	        this.UnSelect = function (cell) {
	            if (cell != null) {
	                selectionService.SetUnSelected([cell]);
	            }
	        };

	        this.ClearSelection = function () {
	            var cells = selectionService.SelectedCells;
	            for (var i = 0; i < cells.length; i++) {
	                if (cells[i])
	                    cells[i] = graphService.GetCellById(cells[i].Id);
	                else
	                    cells.splice(i, 1);
	            }
	            selectionService.ClearSelection();
	            if (cells && cells.length)
	                graphService.UpdateCells(cells);
	        };

	    };

	    return ToolsService;
	}]);

})();


(function () {
    "use strict";

    angular.module("siemens.simaticit.common.widgets.flowEditor")
        .factory("siemens.simaticit.common.widgets.flowEditor.services.UndoRedoService",
            ["$log",
	function ($log) {

	    var HistoryCursor = function (lastExistingAction, lastExistingState) {
	        this.PreviousAction = lastExistingAction;
	        this.NextAction;
	        this.PreviousNode = lastExistingState;
	        this.NextNode;
	    };

	    var HistoryCollection = function (onUndoRedoChanged) {
	        this.CurrentState = new HistoryCursor();
	        this.Head = this.CurrentState;
	        this.Length;

	        this.CanRedo = function () {
	            return this.CurrentState.NextAction != null &&
                    this.CurrentState.NextNode != null;
	        }

	        this.CanUndo = function () {
	            return this.CurrentState.PreviousAction != null &&
                        this.CurrentState.PreviousNode != null;
	        };

	        this.GetUndoableActions = function () {
	            var Current = this.Head;
	            var res = new Array();
	            while (Current != null && Current != this.CurrentState && Current.NextAction != null) {
	                res.push(Current.NextAction);
	                Current = Current.NextNode;
	            }
	            return res;
	        }

	        this.GetRedoableActions = function () {
	            var Current = this.CurrentState;
	            var res = new Array();
	            while (Current != null && Current.NextAction != null) {
	                res.push(Current.NextAction);
	                Current = Current.NextNode;
	            }
	            return res;
	        }

	        this.AddAction = function (action) {
	            this.CurrentState.NextAction = action;
	            this.CurrentState.NextNode = new HistoryCursor(action, this.CurrentState);
	            return true;
	        };

	        this.Clear = function () {
	            this.Head = this.CurrentState = new HistoryCursor();
	        };

	        this.Undo = function () {
	            //-- FMA -------
	            if (this.CurrentState && this.CurrentState.PreviousAction) {
	                angular.forEach(this.CurrentState.PreviousAction.siblings, function (a) { a.UnExecute(); });
	            }

	            if (!this.CanUndo) {
	                $log.error("History.MoveBack() cannot execute");
	            }

	            if (this.CurrentState.PreviousAction && this.CurrentState.PreviousAction.CanUnExecute())
	                this.CurrentState.PreviousAction.UnExecute();

	            this.CurrentState = this.CurrentState.PreviousNode;
	            this.Length -= 1;
	            if (onUndoRedoChanged)
	                onUndoRedoChanged();
	        };

	        this.Redo = function () {

	            //-- FMA -------
	            if (this.CurrentState && this.CurrentState.NextAction) {
	                angular.forEach(this.CurrentState.NextAction.siblings, function (a) { a.Execute(); });
	            }

	            if (!this.CanRedo) {
	                $log.error("History.MoveForward() cannot execute");
	            }

	            if (this.CurrentState.NextAction && this.CurrentState.NextAction.CanExecute())
	                this.CurrentState.NextAction.Execute();

	            this.CurrentState = this.CurrentState.NextNode;
	            this.Length += 1;
	            if (onUndoRedoChanged)
	                onUndoRedoChanged();
	        };
	    };

	    var UndoRedoService = function (scope, onUndoRedoChanged) {
	        this.History = new HistoryCollection(onUndoRedoChanged);

	        this.Record = function (action) {
	            if (action != null) {
	                this.RunAction(action);
	            }
	        };

	        this.Redo = function () {
	            if (!this.CanUndo)
	                return;


	            if (this.IsWorking) {
	                $log.error("UndoRedoManager is currently busy executing a transaction");
	                return;
	            }

	            this.ExecutingAction = this.History.CurrentState.PreviousAction;
	            this.History.Redo();
	            this.ExecutingAction = null;
	        };

	        this.Undo = function () {
	            if (!this.CanRedo)
	                return;

	            if (this.IsWorking) {
	                $log.error("UndoRedoManager is currently busy executing a transaction");
	                return;
	            }

	            this.ExecutingAction = this.History.CurrentState.NextAction;
	            this.History.Undo();
	            this.ExecutingAction = null;
	        };

	        this.CanUndo = function () { return this.History.CanUndo(); };
	        this.CanRedo = function () { return this.History.CanRedo(); };

	        this.GetUndoableActions = function () { return this.History.GetUndoableActions() };
	        this.GetRedoableActions = function () { return this.History.GetRedoableActions() };

	        this.GetCurrentState = function () {
	            return this.History.CurrentState;
	        };

	        this.ExecutingAction;

	        this.Clear = function () {
	            this.History.Clear();
	            this.ExecutingAction = null;
	        }


	        this.CheckIfImWorking = function (action) {
	            var existing = action != null ? action.toString() : "";

	            if (this.ExecutingAction != null) {
	                $log.error("UndoRedoService.Record: the UndoRedoService is currently running or undoing an action ({0})", existing);
	            }
	        };

	        this.RunAction = function (action) {
	            this.CheckIfImWorking(action);
	            this.ExecutingAction = action;
	            if (this.History.AddAction(action)) {
	                this.History.Redo();
	            }
	            this.ExecutingAction = null;
	        };
	    };

	    return UndoRedoService;

	}]);
}());


