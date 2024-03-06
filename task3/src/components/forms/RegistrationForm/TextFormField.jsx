import { TextField } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

export default function TextFormField({
    name,
    onChange,
    defaultHelperText,
    fullWidth = true,
    tooltip,
    ...rest
  }) {
    const { control } = useFormContext()
    const { field, fieldState } = useController({ name, control })
  
    return (
      <TextField
        {...field}
        {...rest}
        fullWidth={fullWidth}
        error={!!fieldState.error}
        helperText={fieldState.error?.message || defaultHelperText}
        onChange={(e) => {
          field.onChange(e)
          onChange?.(e)
        }}
        InputProps={{
          ...rest.InputProps,
        }}
        value={field.value ?? ''}
        variant="outlined"
      />
    )
  }
  