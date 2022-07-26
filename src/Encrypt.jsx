import { useState } from 'react'
import CryptoJS from 'crypto-js'
import useCopyToClipboard from './utils/copyTextToClipboard'
import { toast } from 'react-toastify'

function Encrypt() {
    const [formData, updateFormData] = useState({
        password: '',
        verifyPassword: '',
        text: '',
    })

    const [encrypt, setEncrypt] = useState('')
    const [textType, setTextType] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault
        const { password, text } = formData

        if (!password || !text) {
            toast.error('All input required!')
            return
        }

        handleEncrypt(JSON.stringify(formData))
    }

    const handleChange = (e) => {
        e.preventDefault
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleEncrypt = (value) => {
        const { password, verifyPassword } = formData
        if (password !== verifyPassword) {
            toast.error('Password not match!')
            return
        }
        toast.success('Copy your hash and remember your password!')
        const res = CryptoJS.AES.encrypt(value, formData.password).toString()
        setEncrypt(res)
    }

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = e.target.result
            updateFormData({ ...formData, text })
        }
        reader.readAsText(e.target.files[0])
    }

    const [value, copy] = useCopyToClipboard()

    return (
        <div>
            <br />
            <div className="tabsText">
                <div
                    className={textType && 'active'}
                    onClick={() => setTextType(!textType)}
                >
                    Text
                </div>
                <div
                    className={!textType && 'active'}
                    onClick={() => setTextType(!textType)}
                >
                    File
                </div>
            </div>
            <label>*Encryption</label>
            {textType && (
                <textarea
                    name="text"
                    rows={5}
                    placeholder="Your encryption text "
                    onChange={handleChange}
                />
            )}
            {!textType && (
                <input name="file" type="file" onChange={(e) => showFile(e)} />
            )}

            <br />
            <br />

            <div className="form-section">
                <label>*Password</label>
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
            </div>

            <div className="form-section">
                <label>*Verify Password</label>
                <input
                    name="verifyPassword"
                    type="password"
                    onChange={handleChange}
                />
            </div>

            <p className="warning">Do not forgot your password!</p>

            <button
                onClick={onSubmit}
                style={{ marginBottom: '30px' }}
                className="my-app"
            >
                Encrypt
            </button>

            {encrypt && (
                <div>
                    <div className="encrypt">
                        <p>{encrypt}</p>
                    </div>
                    <div onClick={() => copy(encrypt)} className="copyText">
                        {value ? 'Copied' : 'Copy the Hash'}
                    </div>{' '}
                </div>
            )}

            <br />
            <br />
            <br />
            <h1>How to encrypt?</h1>
            <ol>
                <li>
                    By Default, it chooses <b>Text</b> to encrypt. Select{' '}
                    <b>File</b>, if you wish you encrypt a <b>File</b>.
                </li>
                <li>
                    Enter password. Make sure, you don't forget or lose this
                    passord. It is the only key to get your file or text to
                    decrypt, on top of an <b>Encrypted Hash</b>
                </li>
                <li>
                    Click <b>Encrypt</b>
                </li>
                <li>
                    <b>Copy the Hash</b> and keep it somewhere save.
                </li>
            </ol>

            <h2> Note** </h2>
            <p>
                Try it out first before working with important data. <br />
                <b>Encrypted Hash</b> is the hash that will be used to decypt
                your message back.
            </p>
        </div>
    )
}

export default Encrypt
