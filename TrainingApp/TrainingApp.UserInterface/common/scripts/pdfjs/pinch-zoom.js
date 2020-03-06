/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {

    var pinchZoomInstance;

    function PinchZoom() {
        var isScrollable = false;
        var startX = 0, startY = 0;
        var initialPinchDistance = 0;
        var pinchScale = 1;
        const viewer = document.getElementById("viewer");
        const container = document.getElementById("viewerContainer");

        // Prevent native iOS page zoom
        function reset() {
            startX = startY = initialPinchDistance = 0; pinchScale = 1;
        };

        function defaulttouchmove(e) {
            if (!isScrollable) { 
                e.preventDefault();
            }
        }

        function touchStrt (e) {
            if (e.touches.length > 1) {
                startX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                startY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                initialPinchDistance = Math.hypot((e.touches[1].pageX - e.touches[0].pageX), (e.touches[1].pageY - e.touches[0].pageY));
            } else {
                initialPinchDistance = 0;
            }
        }

        function touchmove(e) {
            if (initialPinchDistance <= 0 || e.touches.length < 2) {
                isScrollable = true;
                return;
            }
            isScrollable = false;
            const pinchDistance = Math.hypot((e.touches[1].pageX - e.touches[0].pageX), (e.touches[1].pageY - e.touches[0].pageY));
            const originX = startX + container.scrollLeft;
            const originY = startY + container.scrollTop;
            pinchScale = pinchDistance / initialPinchDistance;
            viewer.style.transform = `scale(${pinchScale})`;
            viewer.style.transformOrigin = `${originX}px ${originY}px`;
        }

        function touchend() {
            if (initialPinchDistance <= 0) { return; }
            viewer.style.transform = `none`;
            viewer.style.transformOrigin = `unset`;
            PDFViewerApplication.pdfViewer.currentScale *= pinchScale;
            const rect = container.getBoundingClientRect();
            const dx = startX - rect.left;
            const dy = startY - rect.top;
            container.scrollLeft += dx * (pinchScale - 1);
            container.scrollTop += dy * (pinchScale - 1);
            reset();
        }

        this.subscribe = function () {
            document.addEventListener("touchmove", defaulttouchmove, { passive: false });
            viewer.addEventListener("touchstart", touchStrt);
            viewer.addEventListener("touchmove", touchmove );
            viewer.addEventListener("touchend", touchend);
        }

        this.unsubscribe = function () {
            document.removeEventListener("touchmove", defaulttouchmove, { passive: false });
            viewer.removeEventListener("touchstart", touchStrt);
            viewer.removeEventListener("touchmove", touchmove);
            viewer.removeEventListener("touchend", touchend);
        }
    }

    document.addEventListener('webviewerloaded', () => {
        pinchZoomInstance = pinchZoomInstance || new PinchZoom();
        pinchZoomInstance.subscribe();
    });

    document.addEventListener('webviewerunloaded', () => {
        pinchZoomInstance.unsubscribe();
        pinchZoomInstance = null;
    });

})();
