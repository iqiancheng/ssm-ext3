
package com.carl.demo.service;

import com.carl.demo.mapper.MenuMapper;
import com.carl.demo.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author carl
 *
 */
@Service
public class MenuService {

  @Autowired
  private MenuMapper menuMapper;

  public List<Menu> getAllMenus() {
      List<Menu> topMenus = menuMapper.getTopMenus();
      for(Menu menu :topMenus){
           setChilren(menu);
      }
    return topMenus;
  }

  public void setChilren(Menu menu){
      List<Menu> menus = menuMapper.getChildrenMenus(menu);
      if(menus!=null&&menus.size()!=0){
          for(Menu m :menus){
              setChilren(m);
          }
          menu.setChildren(menus);
      }
  }

}
