import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CategoriesList } from "./CategoriesList";


export default function SearshLogic(){
    // ==================SEARSH LOGIC=============================
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

useEffect(() => {
   
    setCategories(CategoriesList.slice(7, 15))
    
  }, []); 


  // دالة البحث عند الكتابة
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    } else {
      const results = categories.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(results);
      setIsDropdownOpen(true);
    }
  };

  // دالة اختيار عنصر من القائمة
  const selectItem = (item) => {
    setSearchTerm(item);
    setFilteredItems([]);
    setIsDropdownOpen(false);

    window.location.pathname=`/${item}`
  };
  const search = (item) => {
    

    window.location.pathname=`/${searchTerm}`
  };

  // إغلاق القائمة عند الضغط خارجها
  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // ==================////SEARSH LOGIC/////=============================
    return(
        <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
      <div className="position-relative">
        <Form.Control
          className="form-control custome-search py-3 rounded-0"
          type="search"
          placeholder="search category..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => {
            if (searchTerm.trim() !== '') {
              setIsDropdownOpen(true);
            }
          }}
          onBlur={handleBlur}
        />
        <Button
          className="position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center"
          variant="primary" onClick={search}
        >
          search
        </Button>

        {/* القائمة المنسدلة للنتائج */}
        {isDropdownOpen && filteredItems.length > 0 && (
          <ul
            className="list-unstyled position-absolute w-100 bg-white border border-top-0 shadow-lg"
            style={{
              top: '100%',
              left: 0,
              zIndex: 1000,
              maxHeight: '300px',
              overflowY: 'auto',
              margin: 0,
              padding: 0,
              border: '1px solid #ddd',
              borderTop: 'none',
            }}
          >
            {filteredItems.map((item, index) => (
              <li
                key={index}
                className="px-4 py-3 cursor-pointer"
                style={{
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  transition: 'background 0.2s',
                }}
                onMouseDown={() => selectItem(item)}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f0f4f8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* رسالة عدم وجود نتائج */}
        {isDropdownOpen && searchTerm.trim() !== '' && filteredItems.length === 0 && (
          <ul
            className="list-unstyled position-absolute w-100 bg-white border border-top-0 shadow-lg"
            style={{
              top: '100%',
              left: 0,
              zIndex: 1000,
              margin: 0,
              padding: '15px',
              border: '1px solid #ddd',
              borderTop: 'none',
            }}
          >
            <li className="text-center text-muted">No products found</li>
          </ul>
        )}
      </div>
    </div>
    )
}