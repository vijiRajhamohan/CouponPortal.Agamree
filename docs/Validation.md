# Validation

## <form-field>

We created `<form-field>` in order to make implementing form validations much easier. You can look at `<form-field>`'s code in `~/components/FormField.ts`. Below are some gotchas and the imports necessary for `<form-field>` to work.

Gotchas:
* the entire form must be contained within a `<form-context :validator="$v">`.
* call the validations (i.e. `@Validate`)
* the `name` property of `form-field` must be the same as the field being validated
* `v-model` of the input itself must be set to the field being validated

Imports
* import the desired Vuelidate validations from `vuelidate/lib/validators` (see **Validations** below).
* import desired regex validations from `'~/services/validations'`;
* import `Validate`

```javascript
    <template>
        <form-context :validator="$v">
            <form-field v-slot="{ attrs, events }" name="radioQuestion" label="Do you want ice-cream?">
                <v-radio-group
                    v-model="radioQuestion"
                    v-bind="attrs"
                    v-on="events"
                >
                    <v-radio label="Yes" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </form-field>
            <form-field v-slot="{ attrs, events }" name="phone" label="Phone Number">
                <v-text-field v-model="phone" v-bind="attrs" mask="phone" autocomplete="disabled" v-on="events" />
            <form-field>
        </form-context>
    </template>
    
    
    <script>
    
    import Vue from 'vue';
    import Vuelidate from 'vuelidate';
    import { required, numeric, phone } from 'vuelidate/lib/validators';
    import { phone, zip } from '~/services/validations';
    import { Validate } from '~/validation/Validate';
    
    
    @Validate({ required })
    public radioQuestion: boolean | null = null;
    @Validate({ required, numeric, phone})
    public phone: '';
    
    </script>
```

## Validations

Standard Vuelidate validations are in `vuelidate/lib/validators`. Take look at the file to see what exactly is required for each validation.

* required
* requiredIf
* requiredUnless
* minLength
* maxLength
* minValue
* maxValue
* between
* alpha
* alphaNum
* numeric
* integer
* decimal
* email
* ipAdress
* macAddress
* sameAs
* url
* not
* or
* and

Custom validations that we have built can be found in `~/services/validations`. Take look at the file to see what exactly is required for each validation.

* phone
* zip
* ssn4
* notInFuture (cannot enter a future date)
* atLeast18YearsAgo (at least 18 years old)
* notAVampire (less than 150 years old)

## Error Messages

Using `<form-field>` automatically includes error messages custom to the error encountered. These are found in `~/plugins/validation`. They are written to automatically include the label in the message. 

It's also possible to implement custom error messages that will be the same for each one (e.g. "Required"). This is particularly helpful for eligibility question pages, where repeating the entire question within the error message would make for very long messages.

Insert `:messages="someObjectName"` into the `<form-context>` component after `:validator="$v"`. Then create the object below in the `export` section.

```javascript
    <template>
        <form-context :validator="$v" :messages="formMessages">
            <form-field v-slot="{ attrs, events }" name="radioQuestion" label="Do you want ice-cream?">
                <v-radio-group
                    v-model="radioQuestion"
                    v-bind="attrs"
                    v-on="events"
                >
                    <v-radio label="Yes" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </form-field>
        </form-context>
    </template>
    
    
    <script>
    
    import Vue from 'vue';
    import Vuelidate from 'vuelidate';
    import { required, numeric, phone } from 'vuelidate/lib/validators';
    import { phone, zip } from '~/services/validations';
    import { Validate } from '~/validation/Validate';
    
    
    @Validate({ required })
    public radioQuestion: boolean | null = null;

    public formMessages = {
        required: 'Required',
    };
    
    </script>
```

## Using @Validate with objects

## Triggering validations on "next"
