import React, {useState} from "react";

import {Button, Picture} from "../../atoms";
import styles from './styles.module.scss'
import {constants} from '../../../utils/constants'
import {useLocation, useNavigate} from "react-router-dom";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {signOut} from "../../../redux/actions/auth";
import {clearCharacters} from "../../../redux/actions/characters";
import {DropDown} from "../../molecules/DropDown";

interface IProps {
    children?: JSX.Element
  inputValue?: string
  onChangeHandler?: any
  getCharactersHandler?: (event:any)=>void
}

export const Header: React.FC<IProps> = ( {inputValue, onChangeHandler,getCharactersHandler, children} ) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const email = useSelector((state: RootStateOrAny) => state.auth?.aboutUser?.email);
    const [isOpenDropDown, setOpenDropDown] = useState<boolean>(false)

    const buttonContent = () => {
        switch (location.pathname) {
            case '/': {
                return {
                    title: 'Sign Out',
                    onClick: () => {
                        dispatch(clearCharacters())
                        dispatch(signOut());
                        navigate('/signin')
                    }
                }
            }
            case '/signin': {
                return {
                    title: 'Sign Up',
                    onClick: () => {
                        navigate('/signup')
                    }
                }
            }
            case '/signup': {
                return {
                    title: 'Sign In',
                    onClick: () => {
                        navigate('/signin')
                    }
                }
            }
            default: return null
        }
    }
    const openDropDown = () => {
        setOpenDropDown(true)
    }

    const closeDropDown = () => {
        setOpenDropDown(false);
    }

    return (
    <div className={styles.header}>
        {isOpenDropDown && <DropDown onClose={closeDropDown} >
          <div className={styles.dropDownContent}>
            <p className={styles.dropDownItem}>position 1</p>
            <p className={styles.dropDownItem}>position 2</p>
            <p className={styles.dropDownItem}>position 3</p>
          </div>
        </DropDown>}
        <Picture type={constants.HEADER_PICTURE} srcImage={""}/>
        {children}
        <div className={styles.navigationBox}>
            <Button handleClick={openDropDown} className={styles.mailButton} type={'button'} buttonText={email}/>
            <Button handleClick={buttonContent()?.onClick} className={styles.headerNavButton} type={'button'} buttonText={buttonContent()?.title}/>
        </div>
    </div>
  )
} 