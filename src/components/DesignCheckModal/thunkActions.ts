/**
 * Thunk Actions
 */

export const addDesignCheckToLocalStorage = async (checkDesign: boolean) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkDesign', JSON.stringify(checkDesign))
    }
  } catch (e) {
    console.error(e)
  }
}
