type Props =  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string
    id?: string
    label: string
    errorMessage?: string
    
}

export default function Input({ name, id = name, label, errorMessage, ...rest }: Props) {
    const inputType = name === "name" ? "name" : name === "email" ? "email" : "password"
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input {...rest} name={name} id={id} type={inputType} />
            <p>{errorMessage}</p>
        </div>
    )
}