import Select from 'react-select'

export default function SelectComponent({ label, options, ...rest }) {
    return (
        <div className="select-block">
            <span>{label}</span>

            <Select
                options={options}
                {...rest}
            />
        </div>
    )
}