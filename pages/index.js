import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { sanity_client } from "../plugin/sanity";
import { useRouter } from "next/router";

export default function BasicTable() {
    const [companyData, setCompanyData] = useState();
    const router = useRouter();

    async function getData() {
        await sanity_client.fetch('*[_type == "company"]').then((res) => {
            setCompanyData(res);
        });
    }

    function onEditData(companyId) {
        const data = {
            companyId: companyId,
        };
        router.push({
            pathname: "/create-company",
            query: data,
        });
    }

    async function onDeleteData(dataId) {
        if (confirm("Are you sure to delete company?")) {
            await sanity_client.delete(dataId).then((res) => {
                console.log(res);
            });
        }
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="p-6">
            <div className="flex flex-row justify-between">
                <h2 className="text-3xl"> Companies </h2>
                <a className="btn btn-accent text-white" href="/create-company">
                    ADD NEW COMPANY
                </a>
            </div>

            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell align="right">Contract Name</TableCell>
                            <TableCell align="right">Products</TableCell>
                            <TableCell align="right">Ingredients</TableCell>
                            <TableCell align="right">Facilities</TableCell>
                            <TableCell align="right">Certificates</TableCell>
                            <TableCell align="right">Paid</TableCell>
                            <TableCell align="right">
                                Contact End Date
                            </TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companyData?.map((company) => (
                            <TableRow
                                key={company._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {company.companyName}
                                </TableCell>
                                <TableCell align="right">
                                    {company.contactTitle +
                                        company.contactName +
                                        " " +
                                        company.contactLastName}
                                </TableCell>
                                <TableCell align="right">
                                    {company.product}
                                </TableCell>
                                <TableCell align="right">
                                    {company.ingredient}
                                </TableCell>
                                <TableCell align="right">
                                    {company.facility}
                                </TableCell>
                                <TableCell align="right">
                                    {company.certificate}
                                </TableCell>
                                <TableCell align="right">
                                    {company.currency} {company.paid}
                                </TableCell>
                                <TableCell align="right">
                                    {company.contractEndDate}
                                </TableCell>
                                <TableCell align="right">
                                    <button
                                        className="btn btn-info text-white"
                                        onClick={() => {
                                            onEditData(company._id);
                                        }}
                                    >
                                        {" "}
                                        edit{" "}
                                    </button>
                                </TableCell>
                                <TableCell align="right">
                                    <button
                                        className="btn btn-error text-white"
                                        onClick={() => {
                                            onDeleteData(company._id);
                                        }}
                                    >
                                        {" "}
                                        delete{" "}
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
