import React, { useState } from "react";
import { sanity_client } from "../../plugin/sanity";
import { useRouter } from "next/router";
import InputBox from "../../components/InputBox";
import SelectInput from "../../components/SelectInput";
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
                Please supply the following information about the company
            </p>

            <div className="flex flex-col space-y-4">
                <InputBox
                    title="Company Name"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={setCompanyName}
                />

                <SelectInput
                    title="Country"
                    placeholder="Country"
                    options={country_option}
                    value={country}
                    onChange={setCountry}
                />
                <InputBox
                    title="Address"
                    placeholder="Address"
                    value={address}
                    onChange={setAddress}
                />
                <InputBox
                    title="Address 2"
                    placeholder="Address 2"
                    value={address2}
                    onChange={setAddress2}
                />
                <div className="flex flex-row space-x-2">
                    <InputBox
                        title="City"
                        placeholder="City"
                        value={city}
                        onChange={setCity}
                    />
                    <InputBox
                        title="Provice / State"
                        placeholder="Provice / State"
                        value={provice}
                        onChange={setProvice}
                    />
                </div>
                <InputBox
                    title="Postal / Zip Code"
                    placeholder="Postal / Zip Code"
                    value={zipCode}
                    onChange={setZipcode}
                />
                <div className="flex flex-row space-x-2">
                    <InputBox
                        title="Contact First Name"
                        placeholder="Contact Name"
                        value={contactName}
                        onChange={setContactName}
                    />
                    <InputBox
                        title="Contact Last Name"
                        placeholder="Contact Last Name"
                        value={contactLastName}
                        onChange={setContactLastName}
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <InputBox
                        title="Contact Title"
                        placeholder="Contact Title"
                        value={contactTitle}
                        onChange={setContactTitle}
                    />
                    <InputBox
                        title="Contact Email"
                        placeholder="Contact Email"
                        value={contactEmail}
                        onChange={setcontactEmail}
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <InputBox
                        title="Phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={setPhone}
                    />
                    <SelectInput
                        title="Contact Type"
                        placeholder="Contact Type"
                        options={contact_type_option}
                        value={contactType}
                        onChange={setContactType}
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <div className="basis-1/2">
                        <InputBox
                            title="Contract End Date"
                            placeholder="Contract End Date"
                            type="date"
                            value={contractEndDate}
                            onChange={setContractEndDate}
                        />
                    </div>
                    <div className="basis-4/12">
                        {" "}
                        <InputBox
                            title="Paid"
                            placeholder="Paid"
                            type="number"
                            value={paid}
                            onChange={setPaid}
                        />
                    </div>
                    <div className="basis-2/12">
                        <SelectInput
                            title="Currency"
                            placeholder="Currency"
                            options={currency_option}
                            value={currency}
                            onChange={setCurrency}
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end">
                <button
                    onClick={saveCompany}
                    className="btn btn-outline btn-accent"
                >
                    Save Change
                </button>
            </div>
        </div>
    );
}
