import { ClientFunction, t } from 'testcafe';
import { waitForPageToLoad } from './waitForPageToLoad';

export function expandElementHeight(selector: any){
    return ClientFunction((selector: any) => {
        const element = selector()
        const styles = element.getAttribute('style'); 
        const updatedStyles = styles.replace(/height|max-height/,'min-height')
        element.setAttribute('style', updatedStyles);
    })(selector);
}