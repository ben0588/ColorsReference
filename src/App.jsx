import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllColor, removeColor } from './store/colorSliec';
import { persistor } from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'bootstrap';
import EditModal from './components/EditModal';

const ColorHoverBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-color: ${(props) => (props.$bg ? props.$bg : null)};
    position: relative;
    cursor: pointer;

    &::before {
        content: '複製代碼';
        display: inherit;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease-in-out;
        opacity: 0;
    }

    &:hover {
        &::before {
            background-color: rgba(0, 0, 0, 0.2);
            opacity: 1;
        }
    }
`;

const ColorHoverButton = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* 設定為透明，且不能搶取點擊事件 */

    &:hover {
        &::before {
            background-color: rgba(0, 0, 0, 0);
        }
    }
`;

function App() {
    const colorRedux = useSelector((state) => state.color);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [target, setTarget] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        modalRef.current = new Modal('#editModal', {
            backdrop: 'static',
        });
    }, []);

    const handleOpenEditModal = (type, data) => {
        setTarget(data);
        setType(type);
        modalRef.current.show();
    };

    const handleCancelEdotModal = () => modalRef.current.hide();

    const handleDeleteAllColor = (type, id) => {
        const deleteOption = {
            title: type === 'all' ? '刪除全部色碼?' : '刪除色碼?',
            text: type === 'all' ? '確認刪除全部色碼紀錄' : `確認刪除色碼「${id}」?`,
            message: type === 'all' ? '刪除全部色碼成功' : '刪除色碼成功',
            callback:
                type === 'all'
                    ? () => {
                          dispatch(removeAllColor());
                          persistor.purge('color');
                      }
                    : () => {
                          dispatch(removeColor(id));
                      },
        };
        Swal.fire({
            title: deleteOption.title,
            text: deleteOption.text,
            icon: 'question',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOption.callback();
                Swal.fire('成功', deleteOption.message, 'success');
            }
        });
    };

    const handleCopyColorCode = (colorCode) => {
        navigator.clipboard.writeText(colorCode).then((text) => {
            toast(`🌟 複製色碼「${colorCode}」成功`, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        });
    };

    return (
        <div className='container'>
            <h1 className='text-center fw-bolder border-bottom border-2 mt-2 py-2 '>紀錄色碼用</h1>
            <div className='border-bottom border-2 pb-3 pt-2 '>
                <h2 className=' fs-4 fw-bolder'>使用說明：</h2>
                <ul className=''>
                    <li>本網站目的：紀錄自己想要的色碼組合 (一組最多五個色碼)，且依照色碼顯示顏色區塊。</li>
                    <li>主要功能：依照設定好的色碼，滑鼠移入按左鍵直接複製代碼。</li>
                    <li>功能支持：「新增」、「編輯」、「刪除單一」、「刪除全部」色碼組合。</li>
                    <li>注意：頁面重新整理不會丟失紀錄，但更換裝置會遺失紀錄！</li>
                </ul>
            </div>
            <div className='d-flex justify-content-between align-items-center pt-3'>
                <button
                    type='button'
                    className='btn btn-outline-danger'
                    style={{ height: `50px` }}
                    onClick={() => handleDeleteAllColor('all')}
                >
                    刪除所有色碼紀錄 ( 請謹慎使用該功能，無法復原 )
                </button>
                <button
                    type='button'
                    className='btn btn-warning fw-bolder  ms-2'
                    style={{ height: `50px` }}
                    onClick={() => handleOpenEditModal('create')}
                >
                    新增色碼
                </button>
            </div>

            <hr />
            {colorRedux?.map((item) => (
                <div key={item.id} className='d-flex align-items-center  '>
                    {item?.colorsList?.map((color, index) => (
                        <ColorHoverBlock key={index} $bg={color || null}>
                            <ColorHoverButton onClick={() => handleCopyColorCode(color)} />
                            <span className='position-absolute  bottom-0 end-0'>{color}</span>
                        </ColorHoverBlock>
                    ))}
                    <button
                        type='button'
                        className='btn btn-dark rounded-0 ms-2'
                        style={{ height: `50px` }}
                        onClick={() => handleDeleteAllColor('no', item.id)}
                    >
                        刪除
                    </button>
                    <button
                        type='button'
                        className='btn btn-secondary rounded-0 ms-2'
                        onClick={() => handleOpenEditModal('edit', item)}
                        style={{ height: `50px` }}
                    >
                        編輯
                    </button>
                    <EditModal handleCancelEdotModal={handleCancelEdotModal} target={target} type={type} />
                    <span className='ms-2'>此組編號：{item.id}</span>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default App;
