
package com.carl.demo.mapper;

import com.carl.demo.model.Menu;

import java.util.List;

/**
 * @author carl
 *
 */
public interface MenuMapper {

  List<Menu> getTopMenus();

  List<Menu> getChildrenMenus(Menu menu);
}
