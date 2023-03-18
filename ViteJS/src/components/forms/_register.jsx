import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, formState: { errors }, formState } = useForm();
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await sleep(200)
        await fetch('http://localhost:8080/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.success === true) {
                return navigate('/')
            }
        });
    };

    return (
        <form className="flex flex-col gap-y-2 w-1/2" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="phonenumber"></label>
            <Input required placeholder="Phone number" {...register("phonenumber")} />
            <label htmlFor="username"></label>
            <Input required placeholder="How can we call you?" {...register("username")} />
            <input type="submit" />
        </form>
    )
}