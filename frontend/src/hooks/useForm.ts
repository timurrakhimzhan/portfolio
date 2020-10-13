import {FormEvent, useEffect, useState} from "react";
import {ObjectSchema, ValidationError} from "yup";

export function useForm(schema: {[key: string]: any}, validationSchema: ObjectSchema) {
    const [values, setValues] = useState(schema);

    const [hasChanged, setHasChanges] = useState(Object.fromEntries(Object.entries(schema).map(([key]) => [key, false])));

    const [errors, setErrors] = useState(Object.fromEntries(Object.entries(schema).map(([key]) => [key, ""])));

    const [valid, setValid] = useState(false);

    const handleChange = (e: FormEvent<HTMLElement>) => {
        const {name, value} = (e.target as HTMLInputElement);
        const newValues = {...values, [name]: value};
        validationSchema.validate(newValues, {abortEarly: false})
            .then(() => setErrors(Object.fromEntries(Object.entries(schema).map(([key]) => [key, ""]))))
            .catch((errors: ValidationError) => {
                const newErrors = Object.fromEntries(Object.entries(schema).map(([key]) => [key, ""]));
                errors.inner.forEach((error: ValidationError) => {
                    if(newErrors.hasOwnProperty(error.path) && newErrors[error.path].length === 0 && hasChanged[error.path]) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
            }
        );
        setValues(newValues);
        setHasChanges({...hasChanged, [name]: true});
    };

    useEffect(() => {
        let valid = true;
        Object.entries(errors).forEach(([key, error]) => (error.length || !hasChanged[key] ? valid = false : null));
        setValid(valid);
    }, [errors, hasChanged]);

    const handleSubmit = (e: FormEvent) => e.preventDefault();

    const reset = () => {
        setValues(schema);
        setErrors(Object.fromEntries(Object.entries(schema).map(([key]) => [key, ""])));
        setHasChanges(Object.fromEntries(Object.entries(schema).map(([key]) => [key, false])));
        setValid(false);
    };

    return {errors, values, valid, handleSubmit, reset, handleChange};
}