import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createColor, updateColor } from '../store/colorSliec';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

const EditModal = ({ target, type, show, handleClose }) => {
    const dispatch = useDispatch();
    const color = useSelector((state) => state.color);

    const initialValue = {
        id: new Date().getTime(),
        colorsList: ['', '', '', '', ''],
    };
    const [colors, setColors] = useState(initialValue);

    useEffect(() => {
        if (type === 'create') {
            setColors(initialValue);
        } else {
            setColors(target);
        }
    }, [target, type]);

    const handleChangeText = (e, i) => {
        setColors((pre) => ({
            ...pre,
            colorsList: pre.colorsList.map((item, index) => {
                if (index === i) {
                    return e.target.value;
                }
                return item;
            }),
        }));
    };

    const handleCreateColorList = () => {
        if (type === 'create') {
            toast(`🌠 新增色碼成功`, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            dispatch(createColor({ ...colors }));
            setColors(initialValue);
            handleClose();
        } else {
            dispatch(updateColor({ ...colors }));
            toast.success(`編輯色碼成功`, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setColors(initialValue);
            handleClose();
        }
    };
    return (
        <Modal show={show} onHide={handleClose} backdrop='static' size='lg'>
            <Modal.Header closeButton>
                <Modal.Title> {type === 'create' ? '新增色碼組合' : `編輯色碼「${target.id}」組合`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>請輸入色碼 (最多五組)</span>
                    {[...Array(5)].map((_, i) => (
                        <input
                            key={i}
                            type='text'
                            name='colors'
                            className='form-control'
                            onChange={(e) => handleChangeText(e, i)}
                            value={colors ? colors?.colorsList?.[i] : ''}
                        />
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose} className='btn btn-secondary'>
                    取消
                </Button>
                <Button
                    variant='primary'
                    onClick={handleCreateColorList}
                    className={`btn text-white ${type === 'create' ? 'bg-success' : 'bg-dark '}`}
                >
                    {type === 'create' ? '新增色碼' : `儲存色碼`}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default EditModal;
