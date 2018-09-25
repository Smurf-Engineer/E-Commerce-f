/**
 * ArtworkSpecs -  Messages
 */
// tslint:disable:max-line-length
import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.ArtworkSpecs.tittle',
    defaultMessage: 'ARTWORK SPECS'
  },
  subtitle: {
    id: 'screens.ArtworkSpecs.subtitle',
    defaultMessage: 'A break down of what is needed  when it comes to art…'
  },
  maintitle: {
    id: 'screens.ArtworkSpecs.maintitle',
    defaultMessage:
      'Graphics and logos are usually designed in one of two ways: VECTOR or RASTER'
  },
  vectorWork: {
    id: 'screens.ArtworkSpecs.vectorWork',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'VECTOR ARTWORK is designed by plotting points on X/Y coordinates and connecting those points together. Most professional designers create logos in vector for one main reason — they can be re-sized without pixelating. This sample of the JAKROO logo, to the left, shows a logo created in vector format. This logo can be enlarged to any size and the lines will always be crisp and sharp.'
  },
  rasterWork: {
    id: 'screens.ArtworkSpecs.rasterWork',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'RASTER ARTWORK is generated by creating a grid of tiny pixels on your computer screen and filling each one of those pixels with a specific color. The pixels are small enough that our eye doesn’t see them as pixels. Raster artwork is created by using a raster-based software, such as Photoshop, which is composed of thousands of little pixels. When our designers try to scale the logo to a larger size, those little pixels become big pixels, therefore resulting in a blurry image. The sample of the JAKROO logo, to the right, will give you an idea as to how the logo will appear if our designers enlarge raster images. JAKROO can’t guarantee the clarity of your artwork if raster images are being used.'
  },
  whatType: {
    id: 'screens.ArtworkSpecs.whatType',
    defaultMessage: 'What type of graphic should you send in?'
  },
  completeText: {
    id: 'screens.ArtworkSpecs.completeText',
    defaultMessage: `
    <p><b>Vector, Vector, Vector! We LOVE Vector Graphics!</b></p>
    <p>Artwork/Logos created in Adobe Illustrator, Freehand or Corel Draw are classified as vector (.ai or .eps).</p>
    <p>***Note for designers: Please make sure all your fonts are converted into paths.***</p>
    <p>If your team is using logos from a sponsor or company, please request vector graphics. Most companies will have the artwork in a vector file format</p>
    
    <p><b>Have a PDF file and you're not sure if its VECTOR or RASTER?</b></p>
    <p>Its about a 50-50 gamble. Some PDF files might appear to be Vector art, but in reality are Raster. Your best bet to finding out if your PDF file is vector or raster is to just send it to us at: <span class="highlight"><a href="mailto:express@jakroousa.com">express@jakroousa.com</a></span></p>
    
    <p><b>Got a Photoshop (.PSD) file?</b></p>
    <p>JAKROO can accept Photoshop (.psd) files as long as certain stipulations are followed to ensure the end result looks great. Photoshop files are classified as raster images which is mentioned above. In order for JAKROO to use .psd files appropriately, we would request that the file size be saved out at 100% the size you would like them to appear, with 150 DPI (dots per inch) or greater. Lastly, we would request that individual logos be saved with a transparent background so our designers can eliminate the potential for any white boxes surrounding your images. If the above stipulations are not followed, JAKROO cannot guarantee the clarity of your artwork.</p>
    <p><span class="highlight">With all that said, our designers still strongly advise against designing all apparel graphics in Photoshop. This can limit our ability to custom scale your graphics between different sizes and pattern shapes.</span></p>
    
    <p><b>JPEG, GIF, PNG, TIFF files...</b></p>
    <p>JPEG, GIF, PNG or TIFF files are classified as low-resolution images and typically should not be used. JAKROO tries to avoid using these if at all possible. These files will not allow us to manipulate them, such as scaling the image up without losing clarity. Our designers will not be able to adjust the colors or take elements away from these files to design with.</p>
    <p>On some occasions our designers can work with PNG or TIFF files as long as they are saved out at 100% the size you would like them to appear, with 150 DPI (dots per inch) or greater (same as Photoshop documents). JAKROO would also request that PNG or TIFF files have a transparent background so the designers can eliminate the white box that surrounds the file. The designers will still be limited with what they can customize with these graphics, but should be able to print them as they appear on your screen. If you are concerned about your logos being acceptable please let us know.</p>
    
    <p><b>Registered, Trademarked, and Copyright images (®™©).</b></p>
    <p>It is illegal to use any Copyrighted or Trademarked images without permission. JAKROO will request that you have proper approval from any company or corporation if you are requesting their images/logos on your apparel. Once the approval form is signed, you will be taking full responsibility for the use of the images on your apparel.</p>
    
    <p><b>How should you select colors for you custom apparel?</b></p>
    <p>The best way to select colors is to use the JAKROO’s Color Chart below. JAKROO Pro Designers have selected these colors because they match best between what you you see on screen and the color of the final product. All screens are different and only color-calibrated screens (like most Smart Phones and Tablets) will represent these colors accurately. Colors outside of JAKROO’s color palette may appear different what what you see on screen. This can be due to the backlight on screens and/or the RGB method of creating color on screen vs print.</p>
    <p>If you would like to see JAKROO's Color Chart printed on the fabrics we use for our apparel, please contact us at <span class="highlight"><a href="mailto:express@jakroousa.com">express@jakroousa.com</a></span> or ask your Account Manager to send you a physical swatch in the mail.</p>
    If you have specific PANTONE® colors that need to be matched you will need to use our Pro Custom design option available at <span class="highlight"><a href="https://www.jakroo.com">https://www.jakroo.com</a></span>
    `
  },
  flatLock: {
    id: 'screens.ArtworkSpecs.flatLock',
    defaultMessage: 'FLATLOCK STITCH COLORS'
  },
  flatLockText: {
    id: 'screens.ArtworkSpecs.flatLockText',
    defaultMessage:
      'It is important to note that flatlock stitching colors may look different on your screen when compared with actual stitching color. This can be due to the backlight on screens, screen calibration and/or the RGB method of creating color on screens.'
  },
  colorChart: {
    id: 'screens.ArtworkSpecs.colorChart',
    defaultMessage: 'JAKROO COLOR CHART'
  }
})
