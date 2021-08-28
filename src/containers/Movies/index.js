import React, { Fragment, useEffect, useMemo, useState, useRef, useCallback, useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { ReactTable, Button, Input, Toaster } from '../../common/component';
import dataService from "../../services";
import { Context } from '../../App';
import { isUserExist, validateUser } from '../../utils/users';

if (typeof window !== "undefined") {
    injectStyle();
}

const Movies = () => {

    const context = useContext(Context);
    const history = useHistory();
    const [data, setData] = useState([])
    const moviesRef = useRef();
    moviesRef.current = data;

    useEffect(() => {
        // axios.get('http://api.tvmaze.com/search/shows?q=golden%20girls').then(res => {
        //     let data = [];
        //     res.data && res.data.map(item => {
        //         let obj = {
        //             id: item.show.id,
        //             name: item.show.name,
        //             genres: item.show.genres,
        //             language: item.show.language,
        //             time: item.show.schedule.time,
        //             days: item.show.schedule.days,
        //             url: item.show.url,
        //         }
        //         data.push(obj)
        //     })
        //     setData(data)

        // }).catch(err => console.log(err))
        getAllMovies()
    }, [])

    const getAllMovies = () => {
        dataService.getAll()
            .then(response => {
                setData(response.data)
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const editMovie = (rowIndex) => {
        const data = moviesRef.current[rowIndex];
        history.push({
            pathname: `/add-artist/${data._id}/?edit=true`,
            state: { config: data }
        });
    };

    const deleteMovie = (rowIndex) => {
        context.confirm.show('Are you sure you want to delete alert?', () => {
            const id = moviesRef.current[rowIndex]._id;
            dataService.remove(id)
                .then((response) => {
                    if (response) getAllMovies()
                }).catch((e) => {
                    console.log(e);
                });
        });

    };

    const notify = () => toast.dark('You are not authorized');

    const columns = useMemo(
        () => [
            {
                Header: 'Artist Name',
                accessor: 'name',
            },
            {
                Header: 'Genres',
                accessor: 'genres',
            },
            {
                Header: 'Language',
                accessor: 'language',
            },
            {
                Header: 'Show Time',
                accessor: 'time',
            },
            {
                Header: 'Days',
                accessor: 'day',
            },
            {
                Header: 'View Show',
                accessor: 'location',
                Cell: (props) => {
                    const data = moviesRef.current[props.row.id];
                    return (
                        <a href={data.location} target="_blank">{data.location}</a>
                    )
                }
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <>
                            <span onClick={() => isUserExist(validateUser()) ? editMovie(rowIdx) : notify()}>
                                <i className="far fa-edit action mr-2"></i>
                            </span>
                            <span onClick={() => isUserExist(validateUser()) ? deleteMovie(rowIdx) : notify()}>
                                <i className="fas fa-trash action"></i>
                            </span>
                        </>
                    );
                },
            }
        ], []
    )

    return <Fragment>
        <div className='float-right' style={{ float: 'right' }}>
            <Button
                buttonType='primary'
                size='sm'
                buttonClick={() => isUserExist(validateUser()) ? history.push('/add-artist') : notify()}
                innerContent='Add Artists'
            />
        </div>
        <Input
            size='sm'
            value={''}
            label=''
            type='select'
            inputChanged={(value, isInValid) => {
                dataService.findByGenres(value)
                    .then((response) => {
                        setData(response.data)
                    }).catch((e) => {
                        console.log(e);
                    });
            }}
            options={['comedy', 'sci-fi', 'romantic']}
            width={4}
            placeholder='select..'
        />
        <ReactTable columns={columns} data={data} />
        <ToastContainer />
    </Fragment>

}

export default withRouter(Movies)