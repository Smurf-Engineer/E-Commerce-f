/**
 * Fragment Shader
 */

const fragment = `
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

// Uniforms colors
uniform vec3 customColor1;
uniform vec3 customColor2;
uniform vec3 customColor3;
uniform vec3 customColor4;
uniform vec3 customColor5;

// Logo position
uniform float positionX;
uniform float positionY;

// Uniforms textures
uniform sampler2D color1;
uniform sampler2D color2;
uniform sampler2D color3;
uniform sampler2D color4;
uniform sampler2D color5;
uniform sampler2D logo;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// Convert to vec4 color
vec4 getVec4Color(in vec3 color)
{
  return vec4(color, 1.0);
}

// Apply color to texture
vec4 colorize(in vec4 texture, in vec4 color)
{
  return (texture * color);
}

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  // #include <map_fragment>

  // Convert to texture the uniforms
  vec4 vecColor1 = texture2D( color1, vUv );
  vec4 vecColor2 = texture2D( color2, vUv );
  vec4 vecColor3 = texture2D( color3, vUv );
  vec4 vecColor4 = texture2D( color4, vUv );
  vec4 vecColor5 = texture2D( color5, vUv ) + vec4(customColor5, 1.0);

  vec2 logoPosition = vUv * vec2(positionX,positionY);
  vec4 veclogo = texture2D( logo, logoPosition);

  // Color texture
  vec4 inputColor1 = getVec4Color(customColor1);
  vec4 inputColor2 = getVec4Color(customColor2);
  vec4 inputColor3 = getVec4Color(customColor3);
  vec4 inputColor4 = getVec4Color(customColor4);
  vec4 colorizedOutput1 = colorize( inputColor1, vecColor1 );
  vec4 colorizedOutput2 = colorize( inputColor2, vecColor2 );
  vec4 colorizedOutput3 = colorize( inputColor3, vecColor3 );
  vec4 colorizedOutput4 = colorize( inputColor4, vecColor4 );

  vec4 texelColor1 = mapTexelToLinear( colorizedOutput1 );
  vec4 texelColor2 = mapTexelToLinear( colorizedOutput2 );
  vec4 texelColor3 = mapTexelToLinear( colorizedOutput3 );
  vec4 texelColor4 = mapTexelToLinear( colorizedOutput4 );
  vec4 texelMap = mapTexelToLinear( vecColor5 );
  vec4 texelLogo = mapTexelToLinear( veclogo );

  // Mix the textures
  vec4 mixTextures = texelColor1 + texelColor2 + texelColor3 + texelColor4 + texelMap * (1.0 - (texelColor1.a + texelColor2.a + texelColor3.a + texelColor4.a));
  diffuseColor *= mixTextures;

  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment>
  #include <emissivemap_fragment>

  // accumulation
  #include <lights_phong_fragment>
  #include <lights_template>

  // modulation
  #include <aomap_fragment>
    
  vec3 outgoingLight = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance);

  #include <envmap_fragment>
  vec4 jersey = vec4(outgoingLight, diffuseColor.a );
  gl_FragColor = jersey;

  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`;

export default fragment;
