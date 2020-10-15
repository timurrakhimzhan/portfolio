import {FormEvent, useEffect, useState} from "react";
import {ObjectSchema, ValidationError} from "yup";
import mapValues from 'lodash/mapValues';

export function useForm<T extends {[key: string]: string}>(schema: T, validationSchema: ObjectSchema) {
    const [values, setValues] = useState<T>(schema);
    const [hasChanged, setHasChanges] = useState<{[key in keyof T]: boolean}>(mapValues(schema, () => false));
    const [clientErrors, setClientErrors] = useState<{[key in keyof T]: string}>(mapValues(schema, () => ""));
    const [validInput, setValidInput] = useState<{[key in keyof T]: boolean}>(mapValues(schema, () => false));
    const [validForm, setValidForm] = useState<boolean>(false);

    const handleChange = (e: FormEvent<HTMLElement>) => {
        const {name, value} = (e.target as HTMLInputElement);
        const newValues: T = {...values, [name]: value};
        setValues(newValues);
        setHasChanges({...hasChanged, [name]: true});
    };

    useEffect(() => {
        let valid = true;
        const newValidInput: {[key in keyof T]: boolean}  = mapValues(schema, () => false);
        Object.entries(clientErrors).forEach(([key, error]) => {
            if(error.length || !hasChanged[key]) {
                valid = false;
            } else {
                newValidInput[key as keyof T] = true;
            }
        });
        setValidForm(valid);
        setValidInput(newValidInput);
    }, [clientErrors, hasChanged, schema]);

    useEffect(() => {
        validationSchema.validate(values, {abortEarly: false})
            .then(() => setClientErrors(mapValues(schema, () => "")))
            .catch((errors: ValidationError) => {
                    const newErrors = mapValues(schema, () => "");
                    errors.inner.forEach((error: ValidationError) => {
                        const field: keyof T = error.path;
                        if(newErrors.hasOwnProperty(field) && newErrors[field]?.length === 0 && hasChanged[field]) {
                            newErrors[field] = error.message;
                        }
                    });
                    setClientErrors(newErrors);
                }
            );
    }, [hasChanged, values, schema, validationSchema]);

    const handleSubmit = (e: FormEvent) => e.preventDefault();

    const reset = () => {
        setValues(schema);
        setClientErrors(mapValues(schema, () => ""));
        setHasChanges(mapValues(schema, () => false));
        setValidInput(mapValues(schema, () => false));
        setValidForm(false);
    };

    return {clientErrors, values, validInput, validForm, handleSubmit, reset, handleChange};
}