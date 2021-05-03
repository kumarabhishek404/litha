import React, { useState } from 'react'
import Input from '../input'
import Button from '../buttons'
import { addNewLithaApi } from '../../services/litha.service'
import { showToast } from '../../lib/global'

const initialState = {
    imageUrl: "",
    headerText: "",
    ctaLink: ""
}


const AddLitha = (props) => {
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false);

    const handleSetState = (value, field) => {
        setState(prev=>({
            ...prev,
            [field]: value
        }))
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if(!state.imageUrl || !state.headerText) return;

        // call api here to store data
        addNewLithaApi(state).then(res=>{
            if(res && res.data){
                showToast(res.data.message, 'success')
            }
            setLoading(false)
            props?.handleSubmit()
            props?.onClose();
        }).catch(error=>{
            console.error(error)
            setLoading(false)
            showToast(error?.response?.data?.message || "Failed to add data", 'error')
        })
    }

    return (
        <React.Fragment>
            <div className="col-12 p-0 pb-3">
                <div className="col-12  p-3 header_color text-center text-white">
                    <div className="h3 m-auto">
                        Add New
                    </div>
                </div>
                <hr className="mt-0"/>
                <div className="col-12 dialog_body">
                    <form 
                        onSubmit={handleFormSubmit}
                        className="col-12">
                        <div className="form-group row">
                            <label htmlFor="imageUrl" className="col-md-3 col-xs-12 col-form-label important">
                                Image Url:
                            </label>
                            <div className="col-md-9 col-xs-12">
                                <Input 
                                    className="form-control"
                                    id="imageUrl"
                                    value={state.imageUrl}
                                    placeholder="image url..."
                                    onChange={(e)=>handleSetState(e.target.value, 'imageUrl')}
                                    />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="headerText" className="col-md-3 col-xs-12 col-form-label important">
                                Header Text:
                            </label>
                            <div className="col-md-9 col-xs-12">
                                <Input 
                                    className="form-control"
                                    id="headerText"
                                    value={state.headerText}
                                    placeholder="header text..."
                                    onChange={(e)=>handleSetState(e.target.value, "headerText")}
                                    />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="ctaLink" className="col-md-3 col-xs-12 col-form-label important">
                                CTA Link:
                            </label>
                            <div className="col-md-9 col-xs-12">
                                <Input 
                                    className="form-control"
                                    id="ctaLink"
                                    value={state.ctaLink}
                                    placeholder="click to action link..."
                                    onChange={(e)=>handleSetState(e.target.value, "ctaLink")}
                                    />
                            </div>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <Button
                                type="submit"
                                disabled={!state.imageUrl || !state.headerText}
                                className="col-xs-6 col-sm-5 col-md-5 mt-3"
                                id="add-litha-btn"
                                >
                                {loading ? "Loading...":"Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddLitha
