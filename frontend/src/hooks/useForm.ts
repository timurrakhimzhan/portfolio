import {FormEvent, useEffect, useState} from "react";
import {ObjectSchema, ValidationError} from "yup";
import mapValues from 'lodash/mapValues';

export function useForm<T extends {[key: string]: string}>(schema: T, validationSchema: ObjectSchema) {
    const [values, setValues] = useState<T>(schema);
    const [hasChanged, setHasChanges] = useState<{[key in keyof T]: boolean}>(mapValues(schema, () => false));
    const [formClientErrors, setFormClientErrors] = useState<{[key in keyof T]: string}>(mapValues(schema, () => "")) ;
    const [valid, setValid] = useState<boolean>(false);

    const handleChange = (e: FormEvent<HTMLElement>) => {
        const {name, value} = (e.target as HTMLInputElement);
        const newValues: T = {...values, [name]: value};
        validationSchema.validate(newValues, {abortEarly: false})
            .then(() => setFormClientErrors(mapValues(schema, () => "")))
            .catch((errors: ValidationError) => {
                const newErrors = mapValues(schema, () => "");
                errors.inner.forEach((error: ValidationError) => {
                    const field: keyof T = error.path;
                    if(newErrors.hasOwnProperty(field) && newErrors[field]?.length === 0 && hasChanged[field]) {
                        newErrors[field] = error.message;
                    }
                });
                setFormClientErrors(newErrors);
            }
        );
        setValues(newValues);
        setHasChanges({...hasChanged, [name]: true});
    };

    useEffect(() => {
        let valid = true;
        Object.entries(formClientErrors).forEach(([key, error]) => {
            if(error.length || !hasChanged[key]) {
                valid = false;
            }
        });
        setValid(valid);
    }, [formClientErrors, hasChanged]);

    const handleSubmit = (e: FormEvent) => e.preventDefault();

    const reset = () => {
        setValues(schema);
        setFormClientErrors(mapValues(schema, () => ""));
        setHasChanges(mapValues(schema, () => false));
        setValid(false);
    };

    return {errors: formClientErrors, values, valid, handleSubmit, reset, handleChange};
}