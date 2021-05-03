import React, { useEffect, useState } from 'react'
import DateRangePicker from '../../../components/datepicker/dateRangePicker'
import Layout from '../../../components/Layout/adminLayout'
import SelectDropdown from '../../../components/select/select'
import { viewAnalyticsData } from '../../../fixtures/viewAnalyticsData'
import useTheme from '../../../hooks/useTheme'
import CustomizedTables from './tableData';

import { customTheme } from '../../../lib/theme';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useAuth from '../../../hooks/useAuth'
// import Chart from '../../../components/charts/index'
// import Chart from "react-apexcharts";
// import Chart from "react-apexcharts";

const Head = dynamic(() => import("../../../components/html/head"), { ssr: false });

const AnalyticsPage = () => {

    const themeType = useSelector(state => state?.store?.theme)
    const theme = customTheme[themeType]
    const route = useRouter()

    const [auth] = useAuth();
    // const [theme] = useTheme();
    const [tab, setTab] = useState("Views")
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [date, setDate] = useState({ startDate: Date.now(), endDate: null })

    const ChartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    }

    const cardStyle = {
        backgroundColor: theme.card.bgColor,
        color: theme.textColor,
        boxShadow: theme.card.boxShadow
    }
    useEffect(() => {
        auth
            ? route.push('/admin/analytics')
            : route.push('/admin/login')
    }, [])

    useEffect(() => {
        setCategories([
            { id: 1, label: "Views", value: "Views" },
            { id: 2, label: "Likes", value: "Likes" },
            { id: 3, label: "Clicks", value: "Clicks" },
            { id: 4, label: "Visits", value: "Visits" },
            { id: 5, label: "Comments", value: "Comments" },
        ])
    }, [])

    const handleSelectCategory = (data) => {
        setTab(data?.value || null)
        setSelectedCategory(data || null);
    }

    // Api call here a/c to category select
    useEffect(() => {
        handleSetStateData()
    }, [tab])

    const handleSetStateData = () => {
        switch (tab) {
            case "Views":
                setTableData(viewAnalyticsData);
                setColumns([
                    // {label: "SL No.", index: true},
                    { id: "id", label: "User Id", align: "left" },
                    { id: "createdAt", label: "Viewed On", align: "left", type: 'date' },
                    { id: "viewedBy", label: "Viewed By", align: "left" },
                    { id: "city", label: "city", align: "left" },
                    { id: "country", label: "country", align: "left" },
                ])
                break;
            default:
                setTableData([])
                setColumns([])
                break;
        }
    }
    const handleDateChange = (value) => {
        setDate(value)
    }

    return (
        <Layout>
            <Head pageTitle="Analytics" />
            <div className="col-12 container py-3">
                <div style={cardStyle} className="card col-12 p-0 mt-3 pt-3 analytics__body">
                    <div className="col-12 analytics__body__header">
                        <div className="pr-3 picker ml-auto">
                            <DateRangePicker
                                value={null}
                                placeholder="MM/DD/YYYY"
                                handleDateChange={handleDateChange}
                            />
                        </div>
                        <SelectDropdown
                            isClearable
                            isSearchable
                            classNamePrefix="litha_website"
                            className="p-0 text-start litha_website-container"
                            value={selectedCategory}
                            styles={{ zIndex: 1001 }}
                            placeholder="select..."
                            onChange={(e) => handleSelectCategory(e)}
                            options={categories}
                        />
                    </div>
                    <hr />
                    <div className='w-100'>
                        {/* <Chart /> */}
                        {/* <Chart
                            options={ChartData.options}
                            series={ChartData.series}
                            type="bar"
                            width="500"
                        /> */}
                    </div>
                    <hr />
                    <div className="col-12 table_data py-3">
                        <CustomizedTables
                            columns={columns}
                            tableData={tableData} />
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default AnalyticsPage
