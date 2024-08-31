import Navbar from '../navbar/index';
import Card from './Card';
import './styles.scss';

function MenuItems() {
  return (
    <div className='parent'>
        <div className="upper">
        <Navbar />
        </div>
        <div className="child">
            <div className="bigBox">
                <Card />
            </div>
        </div>
    </div>
  )
}

export default MenuItems