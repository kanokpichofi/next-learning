export default function InputBox(props) {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text"> {props.title} </span>
            </label>
            <input
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder}
                className="input input-bordered w-full"
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            />
        </div>
    );
}
