import { AxiosError } from 'axios'
import React from 'react'

const handleAxiosError = (error: AxiosError<Error>) => {
    return alert(`${error.response?.data.name} | ${error.response?.data.name}`);
}

export default handleAxiosError