import * as React from 'react';
import {useEffect} from "react";
import {connect} from "react-redux";

import {saveSearchConfig, saveSearchValue} from "../../../actions";
import './SearchInput.scss';

const mapStateToProps = (state: any) => ({
    config: state.app.config
});

const mapDispatchToProps = (dispatch: any) => ({
    saveSearchConfig: (data: object) => dispatch(saveSearchConfig(data)),
    saveSearchValue: (data: string) => dispatch(saveSearchValue(data))
});

function SearchInput(props: any) {
    const { config, saveSearchConfig, saveSearchValue } = props;
    console.log(config);
    useEffect(() => {
        console.log('+');
    });

    const handleChange = (event: any) => {
        // event.persist();
         const searchValue = event.target.value;
        // const regExp = new RegExp(searchValue, 'i');
        //
        // const tasks = config.filter((value: any) => {
        //    if (regExp.test(value.header)) {
        //        return value;
        //    }
        // });
        //
        saveSearchValue(searchValue);
        //
        // saveSearchConfig(tasks);
    };

    return (
        <input onBlur={() => {console.log('+');}} onChange={ (event) => handleChange(event) } className={"search-input"} type={"text"} placeholder={"Введите название..."} />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);