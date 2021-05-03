import React, { useEffect, useState } from 'react'
import DateRangePicker from '../../../components/datepicker/dateRangePicker'
import Layout from '../../../components/Layout/userDashboardLayout'
import SelectDropdown from '../../../components/select/select'
import { viewAnalyticsData } from '../../../fixtures/viewAnalyticsData'
import useTheme from '../../../hooks/useTheme'
import CustomizedTables from './tableData';
import { customTheme } from '../../../lib/theme';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useAuth from '../../../hooks/useAuth'
import LineChart from '../../../components/charts/lineChart/index';
import PieChart from '../../../components/charts/pieChart/index.jsx';
// import Chart from '../../../components/charts/chart/index';
import AreaChart from '../../../components/charts/areaChart/index';
import Button from '../../../components/buttons/index';

const Head = dynamic(() => import("../../../components/html/head"), { ssr: false });

const AnalyticsPage = () => {

    const themeType = useSelector(state => state?.store?.theme)
    const [auth] = useAuth();
    const theme = customTheme[themeType]

    // const [theme] = useTheme();
    const [tab, setTab] = useState("Views")
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [date, setDate] = useState({ startDate: Date.now(), endDate: null })
    const [data, setData] = useState()

    const cardStyle = {
        backgroundColor: theme.card.bgColor,
        color: theme.textColor,
        boxShadow: theme.card.boxShadow
    }

    const route = useRouter();
    console.log(auth, "dash/ana");

    const pageViewData = () => {
        setData([20, 40, 60, 80])
    }

    const scoreData = () => {
        setData([10, 20, 30, 40, 50, 60, 70])
    }

    const revenueData = () => {
        setData([30, 60, 90, 120, 180, 210, 240])
    }

    useEffect(() => {
        // getLithaData()
        auth
            ? route.push('/dashboard/analytics')
            : route.push('/account/login')
    }, [auth])

    useEffect(() => {
        setCategories([
            { id: 1, label: "Views", value: "Views" },
            { id: 2, label: "Likes", value: "Likes" },
            { id: 3, label: "Clicks", value: "Clicks" },
            { id: 4, label: "Visits", value: "Visits" },
            { id: 5, label: "Comments", value: "Comments" },
        ])
        setData([120, 180, 210, 240])
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
            <div className="col-12 container p-3">
                <div className='p-2 d-flex justify-content-center chart__section mb-3' style={{ backgroundColor: cardStyle.backgroundColor }}>
                    <div className='row w-100'>
                        <div className='w-100 d-flex justify-content-around p-4'>
                            <Button onClick={pageViewData} children='Page Review' />
                            <Button onClick={scoreData} children='Revenue' />
                            <Button onClick={revenueData} children='Score' />
                        </div>
                    </div>
                </div>
                <div className='chart__container p-2' style={{ backgroundColor: cardStyle.backgroundColor }}>
                    <div className='d-flex justify-content-between align-items-center p-2'>
                        <div className='border d-flex'>
                            {/* <div>Monthly</div>
                            <div>Yearly</div> */}
                        </div>
                        <SelectDropdown
                            isClearable
                            isSearchable
                            classNamePrefix="litha_website"
                            className="p-0 litha_website-container mb-2 text-end"
                            value={selectedCategory}
                            styles={{ zIndex: 1001 }}
                            placeholder="select..."
                            onChange={(e) => handleSelectCategory(e)}
                            options={categories}
                        />
                    </div>
                    <hr />
                    <div className='chart__box' style={{ height: "100%" }}>
                        {/* <LineChart /> */}
                        <AreaChart values={data} bgColor={cardStyle.backgroundColor} />
                        {/* <PieChart /> */}
                        {/* <Chart/> */}
                    </div>
                </div>

                <div style={cardStyle} className="d-flex align-items-center card col-12 p-0 mt-3 pt-3 analytics__body">
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
