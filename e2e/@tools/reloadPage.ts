export default async function reloadPage(t: TestController) {
    // escape window dialogs when page reloads
    await t.setNativeDialogHandler(() => true);
    // reload page
    await t.eval(() => window.location.reload());
}
