import { Add, Remove, RemoveCircleOutline } from '@material-ui/icons';

export default function InputComponent({ label, name, files = [], changeFiles, ...rest }) {

    const handleAddFile = (file) => {
        console.log(file);
        changeFiles([...files, file]);
    }

    const handleRmFile = (file) => {
        const newFiles = files.filter(item => item.name !== file.name);
        changeFiles(newFiles);
    }

    return (
        <div className="input-file-block">
            <span>{label || ''}</span>

            <content>
                {files.map((item, index) => (
                    <div className="input-file-block-rm" key={index}>
                        <div>
                            <RemoveCircleOutline onClick={() => handleRmFile(item)}/>

                            <img
                                src={URL.createObjectURL(item)}
                            />
                        </div>

                        <span title={item.name}>{item.name}</span>
                    </div>
                ))}

                <label htmlFor={name} className="input-file-block-add"><Add /></label>
                <input
                    id={name}
                    {...rest}
                    type="file"
                    onChange={e => handleAddFile(e.target.files[0])}
                />
            </content>
        </div>
    )
}