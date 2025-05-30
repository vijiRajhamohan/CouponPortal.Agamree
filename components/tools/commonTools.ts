import Vue from 'vue';
import _ from 'lodash';
import { Validation } from 'vuelidate';
import { ISearchFields } from '~/types/componentTypes';

export class CommonTools {
    static titleCase(str: string) {
        return str
            .toLowerCase()
            .split(' ')
            .map(function(word) {
                return (
                    word
                        .toLocaleLowerCase()
                        .charAt(0)
                        .toLocaleUpperCase() + word.slice(1)
                );
            })
            .join(' ');
    }

    static sentenceCase(str: string) {
        const sentence = str
            .toLowerCase()
            .split(' ')
            .map(function(word) {
                return word.toLocaleLowerCase() + word.slice(1);
            })
            .join(' ');

        return sentence.charAt(0).toLocaleUpperCase() + sentence.slice(1);
    }

    static titleFormat(str: string) {
        return ((str.charAt(0).toLocaleUpperCase() + str.slice(1)).match(/[A-Z][a-z]+/g) || []).join(' ');
    }

    // Add to any component with a vuelidate validator and this will log any validation errors
    // to the console.  This is used to diagnose situations where validation fails silently
    static checkError(validator: Validation) {
        const errorKeys = Object.keys(validator).filter((key) => !key.startsWith('$') && validator[key as keyof typeof validator].$anyError);
        errorKeys.length > 0 && console.error('Error on properties:', errorKeys.join(', '));
    }

    // This function works by checking the position of the current page in the pages array
    // and then looking for the next or previous page in the array based on the 'goBack' argument
    static getRouteName(currentPage: string, pages: string[], goBack = false, pathStart = 'need-a-card-'): string {
        const index = pages.indexOf(currentPage);
        let nextPage = ''
        if (goBack && index === 0) {
            return 'index';
        } else if(goBack && index >= 0 && index <= pages.length - 1) {
            nextPage = pages[index - 1]
        } else if (index >= 0 && index < pages.length - 1) {
            nextPage = pages[index + 1]
        } else {
            return pathStart + pages[0]
        }
        return pathStart + nextPage;
    }
}
