/*
This file is part of Ext JS 3.4

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-04-03 15:07:25
*/
/**
 * @class Ext.Action
 * <p>An Action is a piece of reusable functionality that can be abstracted out of any particular component so that it
 * can be usefully shared among multiple components.  Actions let you share handlers, configuration options and UI
 * updates across any components that support the Action interface (primarily {@link Ext.Toolbar}, {@link Ext.Button}
 * and {@link Ext.menu.Menu} components).</p>
 * <p>Aside from supporting the config object interface, any component that needs to use Actions must also support
 * the following method list, as these will be called as needed by the Action class: setText(string), setIconCls(string),
 * setDisabled(boolean), setVisible(boolean) and setHandler(function).</p>
 * Example usage:<br>
 * <pre><code>
// Define the shared MenuAction.  Each component below will have the same
// display text and icon, and will display the same message on click.
var MenuAction = new Ext.Action({
    {@link #text}: 'Do something',
    {@link #handler}: function(){
        Ext.Msg.alert('Click', 'You did something.');
    },
    {@link #iconCls}: 'do-something',
    {@link #itemId}: 'myAction'
});

var panel = new Ext.Panel({
    title: 'Actions',
    width: 500,
    height: 300,
    tbar: [
        // Add the MenuAction directly to a toolbar as a menu button
        MenuAction,
        {
            text: 'Action Menu',
            // Add the MenuAction to a menu as a text item
            menu: [MenuAction]
        }
    ],
    items: [
        // Add the MenuAction to the panel body as a standard button
        new Ext.Button(MenuAction)
    ],
    renderTo: Ext.getBody()
});

// Change the text for all components using the MenuAction
MenuAction.setText('Something else');

// Reference an MenuAction through a container using the itemId
var btn = panel.getComponent('myAction');
var aRef = btn.baseAction;
aRef.setText('New text');
</code></pre>
 * @constructor
 * @param {Object} config The configuration options
 */
Ext.Action = Ext.extend(Object, {
    /**
     * @cfg {String} text The text to set for all components using this MenuAction (defaults to '').
     */
    /**
     * @cfg {String} iconCls
     * The CSS class selector that specifies a background image to be used as the header icon for
     * all components using this MenuAction (defaults to '').
     * <p>An example of specifying a custom icon class would be something like:
     * </p><pre><code>
// specify the property in the config for the class:
     ...
     iconCls: 'do-something'

// css class that specifies background image to be used as the icon image:
.do-something { background-image: url(../images/my-icon.gif) 0 6px no-repeat !important; }
</code></pre>
     */
    /**
     * @cfg {Boolean} disabled True to disable all components using this MenuAction, false to enable them (defaults to false).
     */
    /**
     * @cfg {Boolean} hidden True to hide all components using this MenuAction, false to show them (defaults to false).
     */
    /**
     * @cfg {Function} handler The function that will be invoked by each component tied to this MenuAction
     * when the component's primary event is triggered (defaults to undefined).
     */
    /**
     * @cfg {String} itemId
     * See {@link Ext.Component}.{@link Ext.Component#itemId itemId}.
     */
    /**
     * @cfg {Object} scope The scope (<tt><b>this</b></tt> reference) in which the
     * <code>{@link #handler}</code> is executed. Defaults to this Button.
     */

    constructor : function(config){
        this.initialConfig = config;
        this.itemId = config.itemId = (config.itemId || config.id || Ext.id());
        this.items = [];
    },
    
    // private
    isAction : true,

    /**
     * Sets the text to be displayed by all components using this MenuAction.
     * @param {String} text The text to display
     */
    setText : function(text){
        this.initialConfig.text = text;
        this.callEach('setText', [text]);
    },

    /**
     * Gets the text currently displayed by all components using this MenuAction.
     */
    getText : function(){
        return this.initialConfig.text;
    },

    /**
     * Sets the icon CSS class for all components using this MenuAction.  The class should supply
     * a background image that will be used as the icon image.
     * @param {String} cls The CSS class supplying the icon image
     */
    setIconClass : function(cls){
        this.initialConfig.iconCls = cls;
        this.callEach('setIconClass', [cls]);
    },

    /**
     * Gets the icon CSS class currently used by all components using this MenuAction.
     */
    getIconClass : function(){
        return this.initialConfig.iconCls;
    },

    /**
     * Sets the disabled state of all components using this MenuAction.  Shortcut method
     * for {@link #enable} and {@link #disable}.
     * @param {Boolean} disabled True to disable the component, false to enable it
     */
    setDisabled : function(v){
        this.initialConfig.disabled = v;
        this.callEach('setDisabled', [v]);
    },

    /**
     * Enables all components using this MenuAction.
     */
    enable : function(){
        this.setDisabled(false);
    },

    /**
     * Disables all components using this MenuAction.
     */
    disable : function(){
        this.setDisabled(true);
    },

    /**
     * Returns true if the components using this MenuAction are currently disabled, else returns false.
     */
    isDisabled : function(){
        return this.initialConfig.disabled;
    },

    /**
     * Sets the hidden state of all components using this MenuAction.  Shortcut method
     * for <code>{@link #hide}</code> and <code>{@link #show}</code>.
     * @param {Boolean} hidden True to hide the component, false to show it
     */
    setHidden : function(v){
        this.initialConfig.hidden = v;
        this.callEach('setVisible', [!v]);
    },

    /**
     * Shows all components using this MenuAction.
     */
    show : function(){
        this.setHidden(false);
    },

    /**
     * Hides all components using this MenuAction.
     */
    hide : function(){
        this.setHidden(true);
    },

    /**
     * Returns true if the components using this MenuAction are currently hidden, else returns false.
     */
    isHidden : function(){
        return this.initialConfig.hidden;
    },

    /**
     * Sets the function that will be called by each Component using this MenuAction when its primary event is triggered.
     * @param {Function} fn The function that will be invoked by the MenuAction's components.  The function
     * will be called with no arguments.
     * @param {Object} scope The scope (<code>this</code> reference) in which the function is executed. Defaults to the Component firing the event.
     */
    setHandler : function(fn, scope){
        this.initialConfig.handler = fn;
        this.initialConfig.scope = scope;
        this.callEach('setHandler', [fn, scope]);
    },

    /**
     * Executes the specified function once for each Component currently tied to this MenuAction.  The function passed
     * in should accept a single argument that will be an object that supports the basic Action config/method interface.
     * @param {Function} fn The function to execute for each component
     * @param {Object} scope The scope (<code>this</code> reference) in which the function is executed.  Defaults to the Component.
     */
    each : function(fn, scope){
        Ext.each(this.items, fn, scope);
    },

    // private
    callEach : function(fnName, args){
        var cs = this.items;
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i][fnName].apply(cs[i], args);
        }
    },

    // private
    addComponent : function(comp){
        this.items.push(comp);
        comp.on('destroy', this.removeComponent, this);
    },

    // private
    removeComponent : function(comp){
        this.items.remove(comp);
    },

    /**
     * Executes this MenuAction manually using the handler function specified in the original config object
     * or the handler function set with <code>{@link #setHandler}</code>.  Any arguments passed to this
     * function will be passed on to the handler function.
     * @param {Mixed...} args Variable number of arguments passed to the handler function
     */
    execute : function(){
        this.initialConfig.handler.apply(this.initialConfig.scope || window, arguments);
    }
});