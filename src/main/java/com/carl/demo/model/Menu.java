package com.carl.demo.model;

import java.io.Serializable;
import java.util.List;

/**
 * User: Administrator
 * Date: 13-12-17
 * Time: 下午2:02
 */
public class Menu implements Serializable {
    private Integer id;
    private String  text;
    private String cls;
    private Boolean leaf;

    public List<Menu> getChildren() {
        return children;
    }

    public void setChildren(List<Menu> children) {
        this.children = children;
    }

    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    public String getCls() {
        return cls;
    }

    public void setCls(String cls) {
        this.cls = cls;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    private List<Menu> children;
}
