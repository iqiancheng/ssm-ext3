package com.carl.demo.action;

import com.carl.demo.model.Menu;
import com.carl.demo.service.MenuService;
import com.opensymphony.xwork2.Action;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-17
 * Time: 下午1:44
 * To change this template use File | Settings | File Templates.
 */
@Controller
public class MenuAction {
    private Integer id;
    private List<Menu> menus;
    @Autowired
    private MenuService menuService;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }

    public String execute(){
        /*menus = new ArrayList<Menu>();
        Menu menu1 = new Menu();
        menu1.setId(1);
        menu1.setText("财务管理");
        menu1.setCls("folder");
        menu1.setLeaf(false);

        Menu menu2 = new Menu();
        menu2.setId(2);
        menu2.setText("人力资源管理");
        menu2.setCls("folder");
        menu2.setLeaf(false);

        Menu menu11 = new Menu();
        menu11.setId(11);
        menu11.setText("11");
        menu11.setCls("file");
        menu11.setLeaf(true);

        Menu menu12 = new Menu();
        menu12.setId(11);
        menu12.setText("12");
        menu12.setCls("file");
        menu12.setLeaf(true);

        List<Menu> menus2 = new ArrayList<Menu>();
        menus2.add(menu11);
        menus2.add(menu12);

        Menu menu21 = new Menu();
        menu21.setId(21);
        menu21.setText("21");
        menu21.setCls("file");
        menu21.setLeaf(true);

        List<Menu> menus3 = new ArrayList<Menu>();
        menus3.add(menu21);

        menu1.setChildren(menus2);
        menu2.setChildren(menus3);

        menus.add(menu1);
        menus.add(menu2);*/
        menus = menuService.getAllMenus();
        return Action.SUCCESS;
    }
}

