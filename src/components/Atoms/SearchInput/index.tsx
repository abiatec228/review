import styles from './index.module.scss'
interface IProps {
  value: string;
  onSearchChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPressHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput:React.FC<IProps> = ({value, onSearchChange, onKeyPressHandler }) => {
   return (
    <div className={styles.SearchInput}>
      <input value={value} onChange={onSearchChange} onKeyPress={onKeyPressHandler} />
    </div>
  );
};

export default SearchInput