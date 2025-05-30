import { Context } from '@nuxt/types';
import IriModule from '~/store/iri';

export default async function(context: Context) {
    const module = context.container.get(IriModule);
    if (!module.visibility) {
        module.setIriVisibility(true);
    }
}
