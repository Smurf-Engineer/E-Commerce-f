/**
 * Logo, Text and ClipArt Shader (Fragment)
 */

export const fragmentCanvas = `
    #ifdef GL_ES
    precision highp float;
    #endif

    #define USE_MAP;
    uniform vec3 diffuse;
    uniform float opacity;

    uniform vec3 customColor1;

    uniform sampler2D text;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main(void)
    {
        vec3 c;
        vec4 Ca = texture2D(text, vUv);
        
        vec3 normal = normalize( vNormal );
        vec3 lightDir = normalize( vViewPosition );
        
        float dotProduct = max( dot( normal, lightDir ), 0.0 ) + 0.2;
        gl_FragColor = vec4( Ca.rgb, 1.0 );
    }
`

export const vertexCanvas = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main()
    {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    vUv = uv;
    vNormal = normalize( normalMatrix * normal );
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`
