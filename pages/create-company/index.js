import React, { useState } from "react";
import { sanity_client } from "../../plugin/sanity";
import { useRouter } from "next/router";
import { Button, TextField, Autocomplete } from "@mui/material";
import {
    country_option,
    currency_option,
    contact_type_option,
} from "../../static/variable";

export default function CreateCompany() {
    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [provice, setProvice] = useState("");
    const [zipCode, setZipcode] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactLastName, setContactLastName] = useState("");
    const [contactTitle, setContactTitle] = useState("");
    const [contactEmail, setcontactEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [contactType, setContactType] = useState("");
    const [contractEndDate, setContractEndDate] = useState();
    const [paid, setPaid] = useState(0);
    const [currency, setCurrency] = useState("");

    const [companyData, setCompanyData] = useState();

    const router = useRouter();

    if (Object.keys(router.query).length !== 0 && companyData == null) {
        getCompanyDataById(router.query.companyId);
    }

    async function getCompanyDataById(id) {
        await sanity_client.getDocument(id).then((res) => {
            setCompanyData(res);
            setupData(res);
        });
    }

    function setupData(data) {
        setCompanyName(data.companyName);
        setCountry(data.country);
        setAddress(data.address);
        setAddress2(data.address2);
        setCity(data.city);
        setProvice(data.provice);
        setZipcode(data.zipCode);
        setContactName(data.contactName);
        setContactLastName(data.contactLastName);
        setContactTitle(data.contactTitle);
        setcontactEmail(data.contactEmail);
        setPhone(data.phone);
        setContactType(data.contactType);
        setContractEndDate(data.contractEndDate);
        setPaid(data.paid);
        setCurrency(data.currency);
    }

    async function saveCompany() {
        const newDocument = {
            _type: "company",
            companyName: companyName,
            country: country,
            address: address,
            address2: address2,
            city: city,
            provice: provice,
            zipCode: zipCode,
            contactName: contactName,
            contactLastName: contactLastName,
            contactTitle: contactTitle,
            contactEmail: contactEmail,
            phone: phone,
            contactType: contactType,
            contractEndDate: contractEndDate,
            paid: Number(paid),
            currency: currency,
        };
        try {
            let response;
            if (Object.keys(router.query).length !== 0) {
                response = await sanity_client
                    .patch(router.query.companyId)
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
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                />
                <Autocomplete
                    id="country-box"
                    options={country_option}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Country"
                            variant="outlined"
                            size="small"
                        />
                    )}
                ></Autocomplete>
                <TextField
                    label="Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <TextField
                    label="Address 2"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Provice / State"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </div>
                <TextField
                    label="Postal / Zip Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="Contact First Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Contact Last Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="Contact Title"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Contact Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <TextField
                        label="Phone"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <Autocomplete
                        id="contact-type-box"
                        options={contact_type_option}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Contact Type"
                                variant="outlined"
                                size="small"
                            />
                        )}
                        fullWidth
                    ></Autocomplete>
                </div>
                <div className="flex flex-row space-x-2">
                    <div className="basis-1/2">
                        <TextField
                            label="Contract End Date"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="basis-4/12">
                        <TextField
                            label="Contract Value"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </div>
                    <div className="basis-2/12">
                        <Autocomplete
                            id="currency-box"
                            options={currency_option}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Currency"
                                    variant="outlined"
                                    size="small"
                                    required
                                />
                            )}
                            fullWidth
                        ></Autocomplete>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end">
                <Button>
                    Save Change
                </Button>
            </div>
        </div>
    );
}
