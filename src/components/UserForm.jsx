import React, { useState } from 'react';

const UserForm = () => {
    const [form, setForm] = useState(() => {
        // load Data from the localStorage on Page Load
        const saved = localStorage.getItem('user');
        return saved
            ? JSON.parse(saved)[0]
            : {
                  user: '',
                  email: '',
                  age: '',
                  weight: '',
                  weightgoal: '',
                  caloriegoal: '',
              };
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const { user, email, age, weight, weightgoal, caloriegoal } = form;
        if (!user || !email || !age || !weight || !weightgoal || !caloriegoal) {
            alert('Please fill out all fields.');
            return;
        }
        console.log('Data saved successfully:', form);
        // overwrite old Data with new Data
        localStorage.setItem('user', JSON.stringify([form]));
    };

    return (
        <div className="max-w-3xl m-4 p-6 bg-background rounded-lg flex flex-col gap-2 shadow-xl border">
            <h2 className="text-3xl mb-4 text-shadow">Your Data</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
            >
                <div className="flex gap-4 mb-2 items-center">
                    <label htmlFor="user" className="font-bold w-32">
                        User:
                    </label>
                    <input
                        id="user"
                        type="text"
                        name="user"
                        value={form.user}
                        onChange={handleChange}
                        className="flex-1 bg-white rounded pl-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4 mb-2 items-center">
                    <label htmlFor="email" className="font-bold w-32">
                        Mail:
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="flex-1 bg-white rounded pl-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4 mb-2 items-center">
                    <label htmlFor="age" className="font-bold w-32">
                        Age:
                    </label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="flex-1 bg-white rounded pl-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4 mb-2 items-center">
                    <label htmlFor="weight" className="font-bold w-32">
                        Weight:
                    </label>
                    <input
                        id="weight"
                        type="number"
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        className="flex-1 bg-white rounded pl-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4 mb-2 items-center">
                    <label htmlFor="weightgoal" className="font-bold w-32">
                        Goal:
                    </label>
                    <input
                        id="weightgoal"
                        type="number"
                        name="weightgoal"
                        value={form.weightgoal}
                        onChange={handleChange}
                        className="flex-1 bg-white rounded pl-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4 mb-2 items-center">
                    <label htmlFor="caloriegoal" className="font-bold w-32">
                        Calorie Goal:
                    </label>
                    <input
                        id="caloriegoal"
                        name="caloriegoal"
                        type="number"
                        value={form.caloriegoal}
                        onChange={handleChange}
                        className="flex-1 bg-white rounded pl-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="px-2 py-1.25 cursor-pointer bg-primary hover:bg-hover rounded shadow-md text-white font-bold"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
