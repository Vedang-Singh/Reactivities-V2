import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {TextField, TextFieldProps} from "@mui/material";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps;

function TextInput<T extends FieldValues>(props: Props<T>) {

    const {field, fieldState} = useController({...props});
    return (
        <TextField
            {...props}
            {...field}
            value={field.value || ""}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}

export default TextInput;