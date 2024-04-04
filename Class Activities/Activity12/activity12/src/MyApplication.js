import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF, setDataF] = useState({});
    const [viewer, setViewer] = useState(0);

    return (
        <div>
            {viewer === 0 && <Payment />}
            {viewer === 1 && <Summary />}
        </div>
    );

    function Payment() {
        const onSubmit = (data) => {
            console.log(data);
            console.log(data.fullName);
            setDataF(data);
            setViewer(1);
        }

        return (<div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("fullName", { required: true })} placeholder="Full Name" />
                {errors.fullName && <p>Full Name is required.</p>}
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
                {errors.email && <p>Email is required.</p>}
                <input {...register("creditCard", { required: true })} placeholder="Credit Card" />
                {errors.creditCard && <p>Credit Card is required.</p>}
                <input {...register("address", { required: true })} placeholder="Address" />
                {errors.address && <p>Address is required.</p>}
                <input {...register("address2")} placeholder="Address 2" />
                <input {...register("city", { required: true })} placeholder="City" />
                {errors.city && <p>City is required.</p>}
                <input {...register("state", { required: true })} placeholder="State" />
                {errors.state && <p>State is required.</p>}
                <input {...register("zip", { required: true })} placeholder="Zip" />
                {errors.zip && <p>Zip is required.</p>}
                <button type="submit">Submit</button>
            </form>
        </div>);
    };

    function Summary() {
        const updateHooks = () => {
            setViewer(0);
            setDataF({});
        };

        return (
            <div>
                <h2>Summary of payment:</h2>
                <div className="card">
                    <div className="card-body">
                        <h3><strong>Full Name:</strong> {dataF.fullName}</h3>
                        <p><strong>Email:</strong> {dataF.email}</p>
                        <p><strong>Credit Card:</strong> {dataF.creditCard}</p>
                        <p><strong>Address:</strong> {dataF.address}</p>
                        <p><strong>Address 2:</strong> {dataF.address2}</p>
                        <p><strong>City:</strong> {dataF.city}</p>
                        <p><strong>State:</strong> {dataF.state}</p>
                        <p><strong>Zip:</strong> {dataF.zip}</p>
                    </div>
                </div>
                <button onClick={updateHooks} >
                    Submit
                </button>
            </div>
        );
    }

}


export default App;
