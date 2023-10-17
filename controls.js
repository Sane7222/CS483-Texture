class Keys {
    constructor() {
        this.keys_down = {};
    }

    static start_listening(document, canvas) {
        let keys = new Keys();

        addEventListener('keydown', function(ev) {
            if (typeof ev.code === 'string') {
                keys.keys_down[ev.code] = true;
            }
        })

        addEventListener('keyup', function(ev) {
            if (typeof ev.code === 'string') {
                keys.keys_down[ev.code] = false;
            }
        })

        canvas.addEventListener('mousemove', function(ev) { // Mouse functionality to Canvas
            if (document.pointerLockElement !== canvas) return;
            camera = camera.mul(Mat4.rotation_xz(ev.movementX * 0.003).mul(Mat4.rotation_yz(ev.movementY * -0.003))); // Rotate Camera
        })

        canvas.onclick = function() {
            canvas.requestPointerLock();
        }

        return keys;
    }

    is_key_down(code) {
        return !!this.keys_down[code];
    }

    is_key_up(code) {
        return !this.keys_down[code];
    }

    keys_down_list() {
        return Object.entries(this.keys_down).filter(kv => kv[1]).map(kv => kv[0]);
    }

    control(camera) {
        let speed = this.is_key_down('ShiftLeft') ? 4 : 1;

        if (this.is_key_down('KeyA')) camera = camera.mul(Mat4.translation(-0.02 * speed, 0, 0));
        if (this.is_key_down('KeyD')) camera = camera.mul(Mat4.translation(0.02 * speed, 0, 0));
        if (this.is_key_down('KeyW')) camera = camera.mul(Mat4.translation(0, 0, 0.02 * speed));
        if (this.is_key_down('KeyS')) camera = camera.mul(Mat4.translation(0, 0, -0.02 * speed));
        if (this.is_key_down('Space')) camera = camera.mul(Mat4.translation(0, 0.02 * speed, 0));
        if (this.is_key_down('KeyC')) camera = camera.mul(Mat4.translation(0, -0.02 * speed, 0));
        if (this.is_key_down('KeyQ')) camera = camera.mul(Mat4.rotation_xy(-0.002 * speed));
        if (this.is_key_down('KeyE')) camera = camera.mul(Mat4.rotation_xy(0.002 * speed));
        if (this.is_key_down('ArrowUp')) camera = camera.mul(Mat4.rotation_yz(-0.002 * speed));
        if (this.is_key_down('ArrowDown')) camera = camera.mul(Mat4.rotation_yz(0.002 * speed));
        if (this.is_key_down('ArrowLeft')) camera = camera.mul(Mat4.rotation_xz(-0.002 * speed));
        if (this.is_key_down('ArrowRight')) camera = camera.mul(Mat4.rotation_xz(0.002 * speed));

        return camera;
    }
}

