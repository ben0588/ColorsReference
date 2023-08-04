import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createColor, updateColor } from '../store/colorSliec';
import { toast } from 'react-toastify';

const EditModal = ({ handleCancelEdotModal, target, type }) => {
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
            handleCancelEdotModal();
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
            handleCancelEdotModal();
        }
    };
    return (
        <div className='modal fade  ' id='editModal'>
            <div className='modal-dialog modal-xl'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            {type === 'create' ? '新增色碼組合' : `編輯色碼「${target.id}」組合`}
                        </h1>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='input-group mb-3'>
                            <span className='input-group-text' id='inputGroup-sizing-default'>
                                請輸入色碼 (最多五組)
                            </span>
                            {[...Array(5)].map((_, i) => (
                                <input
                                    key={i}
                                    type='text'
                                    name='colors'
                                    className='form-control'
                                    aria-label='Sizing example input'
                                    aria-describedby='inputGroup-sizing-default'
                                    onChange={(e) => handleChangeText(e, i)}
                                    value={colors ? colors?.colorsList?.[i] : ''}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                            onClick={handleCancelEdotModal}
                        >
                            取消
                        </button>
                        <button
                            type='button'
                            className={`btn text-white ${type === 'create' ? 'bg-success' : 'bg-dark '}`}
                            onClick={() => handleCreateColorList()}
                        >
                            {type === 'create' ? '新增色碼' : `儲存色碼`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditModal;
