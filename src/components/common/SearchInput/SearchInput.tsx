import * as React from 'react';
import {useEffect, useRef} from "react";
import {connect} from "react-redux";

import { saveSearchValue} from "../../../actions";
import './SearchInput.scss';
import {ISearchInput} from "../../../types/interfaces";


const mapStateToProps = (state: any ) => ({
    config: state.app.config
});

const mapDispatchToProps = (dispatch: any) => ({
    saveSearchValue: (data: string) => dispatch(saveSearchValue(data))
});

function SearchInput(props: ISearchInput) {
    const { saveSearchValue } = props;
    const [ isFocused, change ] = React.useState(false);
    const $inputSearch = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if ($inputSearch && $inputSearch.current) {
            $inputSearch.current.value = '';
        }

        saveSearchValue('');
    });

    const handleFocus = () => {
        change(true);
    };

    const handleBlur = () => {
        change(false);
    };

    const handleChange = (event: any) => {
        const searchValue = event.target.value;

        saveSearchValue(searchValue);
    };

    const getStyles = () => {
        if (isFocused) {
            return {
                width: '100%'
            }
        }

        return {
            width: '200px'
        }
    };

    return (
        <div className={"content-container content-container_visible"}>
            <input
                ref={$inputSearch}
                id="search"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={ (event) => handleChange(event) }
                style={getStyles()}
                className={"search-input"}
                type={"text"}
                placeholder={"Введите название..."}
            />
            <div id="search-block" />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);