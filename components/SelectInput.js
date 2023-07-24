export default function SelectInput(props) {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{props.title}</span>
            </label>
            <select
                className="select select-bordered w-full"
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            >
                <option disabled selected value="">{props.placeholder}</option>
                {props.options.map((option) => {
                    return (
                        <>
                            <option value={option.value} key={option.value}>
                                {" "}
                                {option.title}{" "}
                            </option>
                        </>
                    );
                })}
            </select>
        </div>
    );
}
