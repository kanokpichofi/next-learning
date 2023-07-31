import React, { useState } from "react";
import { sanity_client } from "../../plugin/sanity";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FormControl, Button, TextField, Autocomplete, Select, InputLabel, MenuItem } from "@mui/material";
import {
    country_option,
    contact_type_option,
} from "../../static/variable";

export default function CreateCompany() {
    const [companyData, setCompanyData] = useState();

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    if (Object.keys(router.query).length !== 0 && companyData == null) {
        setCompanyData(router.query)
    }

    function countryChange(e, value, reason) {
        if (!value || value === '') {
            setValue('country', '')
            return
        }
        setValue('country', value.value)
    }

    function contactTypeChange(e, value, reason) {
        if (!value || value === '') {
            setValue('contactType', '')
            return
        }
        setValue('contactType', value.value)
    } 

    async function saveCompany(data) {
        const newDocument = {
            _type: "company",
            companyName: data.companyName,
            country: data.country,
            address: data.address,
            address2: data.address_2,
            city: data.city,
            provice: data.proviceState,
            zipCode: data.postalCode,
            contactName: data.contactName,
            contactLastName: data.contactLastName,
            contactTitle: data.contactTitle,
            contactEmail: data.contactEmail,
            phone: data.phone,
            contactType: data.contactType,
            contractEndDate: data.contractEndDate,
            paid: Number(data.contractValue),
            currency: data.currency,
        };
        try {
            let response;
            if (Object.keys(router.query).length !== 0) {
                response = await sanity_client
                    .patch(companyData?._id)
                    .set(newDocument)
                    .commit();
            } else {
                response = await sanity_client.create(newDocument);
            }
            alert("Successfully save company");
            router.push({
                pathname: "/",
            });
        } catch (error) {
            alert("Error on saving company: ", error);
        }
    }

    return (
        <div className="flex flex-col w-full p-6 space-y-4">
            <h1 className="text-3xl">Account Details</h1>
            <div className="divider"></div>
            <p className="text-xl">
                Please supply the following information about the company.
            </p>

            <div className="flex flex-col space-y-4">
                <TextField
                    label="Company Name"
                    {...register('companyName')}
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={errors.companyName ? true : false}
                    helperText={errors.companyName?.message}
                    defaultValue={companyData?.companyName}
                />
                <Autocomplete
                    id="country-box"
                    {...register('country')}
                    options={country_option}
                    getOptionLabel={(option) => option.title}
                    onChange={countryChange}
                    defaultValue={country_option.find(data => data.value == companyData?.country)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Country"
                            variant="outlined"
                            size="small"
                            error={errors.country ? true : false}
                            helperText={errors.country?.message}
                        />
                    )}
                ></Autocomplete>
                <TextField
                    label="Address"
                    {...register('address')}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.address ? true : false}
                    helperText={errors.address?.message}
                    defaultValue={companyData?.address}
                />
                <TextField
                    label="Address 2"
                    {...register('address_2')}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.address_2 ? true : false}
                    helperText={errors.address_2?.message}
                    defaultValue={companyData?.address2}
                />
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="City"
                        {...register('city')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.city ? true : false}
                        helperText={errors.city?.message}
                        defaultValue={companyData?.city}
                    />
                    <TextField
                        label="Provice / State"
                        {...register('proviceState')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.proviceState ? true : false}
                        helperText={errors.proviceState?.message}
                        defaultValue={companyData?.provice}
                    />
                </div>
                <TextField
                    label="Postal / Zip Code"
                    {...register('postalCode')}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errors.postalCode ? true : false}
                    helperText={errors.postalCode?.message}
                    defaultValue={companyData?.zipCode}
                />
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="Contact First Name"
                        {...register('contactFirstName')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.contactFirstName ? true : false}
                        helperText={errors.contactFirstName?.message}
                        defaultValue={companyData?.contactName}
                    />
                    <TextField
                        label="Contact Last Name"
                        {...register('contactLastName')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.contactLastName ? true : false}
                        helperText={errors.contactLastName?.message}
                        defaultValue={companyData?.contactLastName}
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="Contact Title"
                        {...register('contactTitle')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.contactTitle ? true : false}
                        helperText={errors.contactTitle?.message}
                        defaultValue={companyData?.contactTitle}
                    />
                    <TextField
                        label="Contact Email"
                        {...register('contactEmail')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.contactEmail ? true : false}
                        helperText={errors.contactEmail?.message}
                        defaultValue={companyData?.contactEmail}
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="Phone"
                        {...register('phone')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.phone ? true : false}
                        helperText={errors.phone?.message}
                        defaultValue={companyData?.phone}
                    />
                    <Autocomplete
                        id="contact-type-box"
                        {...register('contactType')}
                        options={contact_type_option}
                        getOptionLabel={(option) => option.title}
                        onChange={contactTypeChange}
                        defaultValue={contact_type_option.find(data => data.value == companyData?.contactType)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Contact Type"
                                variant="outlined"
                                size="small"
                                error={errors.contactType ? true : false}
                                helperText={errors.contactType?.message}
                            />
                        )}
                        fullWidth
                    ></Autocomplete>
                </div>
                <div className="flex flex-row space-x-2">
                    <div className="basis-1/2">
                        <TextField
                            label="Contract End Date"
                            {...register('contractEndDate')}
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            error={errors.contractEndDate ? true : false}
                            helperText={errors.contractEndDate?.message}
                            defaultValue={companyData?.contractEndDate}
                        />
                    </div>
                    <div className="flex flex-row space-x-2 basis-1/2">
                        <TextField
                            label="Contract Value"
                            {...register('contractValue')}
                            variant="outlined"
                            size="small"
                            fullWidth
                            error={errors.contractValue ? true : false}
                            helperText={errors.contractValue?.message}
                            defaultValue={companyData?.paid}
                        />
                        <FormControl variant="outlined" size="small" fullWidth required error={errors.contractCurrency ? true : false}>
                            <InputLabel id="currency-select-outlined-label">Currency</InputLabel>
                            <Select {...register('contractCurrency')} defaultValue={companyData?.currency ? companyData?.currency : 'USD'} displayEmpty label="Currency">
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="CAD">CAD</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* <div className="basis-2/12">
                        
                    </div> */}
                </div>
            </div>
            <div className="flex w-full justify-end">
                <Button variant="contained" onClick={handleSubmit(saveCompany)}> {Object.keys(router.query).length !== 0 ? "UPDATE" : "ADD"} </Button>
            </div>
        </div>
    );
}
