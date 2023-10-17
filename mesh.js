
const VERTEX_STRIDE = 36;

class Mesh {
    /** 
     * Creates a new mesh and loads it into video memory.
     * 
     * @param {WebGLRenderingContext} gl  
     * @param {number} program
     * @param {number[]} vertices
     * @param {number[]} indices
    */
    constructor( gl, program, vertices, indices ) {
        this.verts = create_and_load_vertex_buffer( gl, vertices, gl.STATIC_DRAW );
        this.indis = create_and_load_elements_buffer( gl, indices, gl.STATIC_DRAW );

        this.n_verts = vertices.length;
        this.n_indis = indices.length;
        this.program = program;
    }

    /**
     * Create a box mesh with the given dimensions and colors.
     * @param {WebGLRenderingContext} gl 
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     */

    static box( gl, program, width, height, depth ) {
        let hwidth = width / 2.0;
        let hheight = height / 2.0;
        let hdepth = depth / 2.0;

        let verts = [ // Front Face
            hwidth, -hheight, -hdepth,      1.0, 0.0, 0.0, 1.0,     0.25, 0.5,  //11
            -hwidth, -hheight, -hdepth,     0.0, 1.0, 0.0, 1.0,     0, 0.5,     //01
            -hwidth, hheight, -hdepth,      0.0, 0.0, 1.0, 1.0,     0, 0.25,    //00
            hwidth, hheight, -hdepth,       1.0, 1.0, 0.0, 1.0,     0.25, 0.25, //10

            hwidth, -hheight, hdepth,       1.0, 0.0, 1.0, 1.0,     0.5, 0.5,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 1.0, 1.0,     0.75, 0.5,
            -hwidth, hheight, hdepth,       0.5, 0.5, 1.0, 1.0,     0.75, 0.25,
            hwidth, hheight, hdepth,        1.0, 1.0, 0.5, 1.0,     0.5, 0.25,

            -hwidth, -hheight, -hdepth,     1.0, 0.0, 0.0, 1.0,     1, 1,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 0.0, 1.0,     0, 1,
            -hwidth, hheight, hdepth,       0.0, 0.0, 1.0, 1.0,     0, 0,
            -hwidth, hheight, -hdepth,      1.0, 1.0, 0.0, 1.0,     1, 0,

            hwidth, -hheight, -hdepth,      1.0, 0.0, 0.0, 1.0,     1, 1,
            hwidth, -hheight, hdepth,       0.0, 1.0, 0.0, 1.0,     0, 1,
            hwidth, hheight, hdepth,        0.0, 0.0, 1.0, 1.0,     0, 0,
            hwidth, hheight, -hdepth,       1.0, 1.0, 0.0, 1.0,     1, 0,

            /*hwidth, -hheight, -hdepth,      1.0, 0.0, 0.0, 1.0,     0.25, 0.5,
            -hwidth, -hheight, -hdepth,     0.0, 1.0, 0.0, 1.0,     1, 0.5,
            -hwidth, hheight, -hdepth,      0.0, 0.0, 1.0, 1.0,     1, 0.25,
            hwidth, hheight, -hdepth,       1.0, 1.0, 0.0, 1.0,     0.25, 0.25,

            hwidth, -hheight, hdepth,       1.0, 0.0, 1.0, 1.0,     0.5, 0.5,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 1.0, 1.0,     0.75, 0.5,
            -hwidth, hheight, hdepth,       0.5, 0.5, 1.0, 1.0,     0.75, 0.25,
            hwidth, hheight, hdepth,        1.0, 1.0, 0.5, 1.0,     0.5, 0.25,*/

            /*hwidth, -hheight, -hdepth,      1.0, 0.0, 0.0, 1.0,     1, 1,
            -hwidth, -hheight, -hdepth,     0.0, 1.0, 0.0, 1.0,     0, 1,
            -hwidth, hheight, -hdepth,      0.0, 0.0, 1.0, 1.0,     0, 0,
            hwidth, hheight, -hdepth,       1.0, 1.0, 0.0, 1.0,     1, 0,

            hwidth, -hheight, hdepth,       1.0, 0.0, 1.0, 1.0,     1, 1,
            -hwidth, -hheight, hdepth,      0.0, 1.0, 1.0, 1.0,     0, 1,
            -hwidth, hheight, hdepth,       0.5, 0.5, 1.0, 1.0,     0, 0,
            hwidth, hheight, hdepth,        1.0, 1.0, 0.5, 1.0,     1, 0,*/
        ]; // Back Face

        let indis = [
            // clockwise winding
            /*
            0, 1, 2, 2, 3, 0, 
            4, 0, 3, 3, 7, 4, 
            5, 4, 7, 7, 6, 5, 
            1, 5, 6, 6, 2, 1,
            3, 2, 6, 6, 7, 3,
            4, 5, 1, 1, 0, 4,
            */

            // counter-clockwise winding
            0, 3, 2, 2, 1, 0,
            4, 7, 3, 3, 0, 4,
            5, 6, 7, 7, 4, 5,
            1, 2, 6, 6, 5, 1,
            3, 7, 6, 6, 2, 3,
            4, 0, 1, 1, 5, 4,
        ];

        return new Mesh( gl, program, verts, indis );
    }

    /**
     * Render the mesh. Does NOT preserve array/index buffer or program bindings! 
     * 
     * @param {WebGLRenderingContext} gl 
     */
    render( gl ) {
        gl.cullFace( gl.BACK );
        gl.enable( gl.CULL_FACE );
        
        gl.useProgram( this.program );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.verts );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indis );

        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "coordinates", 
            this.verts, 3, 
            gl.FLOAT, false, VERTEX_STRIDE, 0 
        );

        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "color", 
            this.verts, 4, 
            gl.FLOAT, false, VERTEX_STRIDE, 12
        );

        set_vertex_attrib_to_buffer(
            gl, this.program,
            "uv",
            this.verts, 2,
            gl.FLOAT, false, VERTEX_STRIDE, 28
        );

        let sampler_loc = gl.getUniformLocation(this.program, 'tex_0');
        gl.uniform1i(sampler_loc, 0);

        gl.drawElements( gl.TRIANGLES, this.n_indis, gl.UNSIGNED_SHORT, 0 );
    }

    /**
     * Parse the given text as the body of an obj file.
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {string} text
     */
    static from_obj_text( gl, program, text ) {
        let vertices = [];
        let indices = [];

        let lines = text.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) { // Foreach line
            let line = lines[i].trim();
            let parts_of_line = line.split(' '); // Split by space

            if (parts_of_line[0] === "v") { // Vertices
                for (let i = 1; i < parts_of_line.length; i++) vertices.push(parts_of_line[i]);
            } else if (parts_of_line[0] === "f") { // Indices | Adjust so 1 -> 0
                for (let i = 1; i < parts_of_line.length; i++) indices.push(--parts_of_line[i]);
            }
        }
        return new Mesh(gl, program, vertices, indices);
    }

    /**
     * Asynchronously load the obj file as a mesh.
     * @param {WebGLRenderingContext} gl
     * @param {string} file_name 
     * @param {WebGLProgram} program
     * @param {function} f the function to call and give mesh to when finished.
     */
    static from_obj_file( gl, file_name, program, f ) {
        let request = new XMLHttpRequest();
        
        // the function that will be called when the file is being loaded
        request.onreadystatechange = function() {
            // console.log( request.readyState );

            if( request.readyState != 4 ) { return; }
            if( request.status != 200 ) { 
                throw new Error( 'HTTP error when opening .obj file: ', request.statusText ); 
            }

            // now we know the file exists and is ready
            let loaded_mesh = Mesh.from_obj_text( gl, program, request.responseText );

            console.log( 'loaded ', file_name );
            f( loaded_mesh );
        };
        
        request.open( 'GET', file_name ); // initialize request. 
        request.send();                   // execute request
    }
}
