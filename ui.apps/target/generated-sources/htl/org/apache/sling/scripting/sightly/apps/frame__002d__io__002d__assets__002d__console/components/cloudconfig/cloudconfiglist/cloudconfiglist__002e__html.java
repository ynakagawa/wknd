/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 ******************************************************************************/
package org.apache.sling.scripting.sightly.apps.frame__002d__io__002d__assets__002d__console.components.cloudconfig.cloudconfiglist;

import java.io.PrintWriter;
import java.util.Collection;
import javax.script.Bindings;

import org.apache.sling.scripting.sightly.render.RenderUnit;
import org.apache.sling.scripting.sightly.render.RenderContext;

public final class cloudconfiglist__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _global_list = null;
Object _dynamic_request = bindings.get("request");
Collection var_collectionvar2_list_coerced$ = null;
out.write("\n");
_global_list = renderContext.call("use", com.adobe.acs.frameio.assets.core.cloudconfig.CloudConfigurationList.class.getName(), obj());
out.write("\n    <section class=\"coral-light frameio-cloudconfig-summary\">\n        <h1 class=\"coral-Heading coral-Heading--1\">");
{
    Object var_0 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(_dynamic_request, "requestPathInfo"), "suffixResource"), "valueMap"), "jcr:title"), "text");
    out.write(renderContext.getObjectModel().toString(var_0));
}
out.write("</h1>\n        <p>");
{
    Object var_1 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(_dynamic_request, "requestPathInfo"), "suffixResource"), "valueMap"), "jcr:description"), "text");
    out.write(renderContext.getObjectModel().toString(var_1));
}
out.write("</p>\n    </section>\n    <section>\n        ");
{
    Object var_collectionvar2 = renderContext.getObjectModel().resolveProperty(_global_list, "cloudConfigurations");
    {
        long var_size3 = ((var_collectionvar2_list_coerced$ == null ? (var_collectionvar2_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar2)) : var_collectionvar2_list_coerced$).size());
        {
            boolean var_notempty4 = (var_size3 > 0);
            if (var_notempty4) {
                {
                    long var_end7 = var_size3;
                    {
                        boolean var_validstartstepend8 = (((0 < var_size3) && true) && (var_end7 > 0));
                        if (var_validstartstepend8) {
                            out.write("<coral-masonry layout=\"fixed-spread\" columnwidth=\"242\" spacing=\"15\">");
                            if (var_collectionvar2_list_coerced$ == null) {
                                var_collectionvar2_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar2);
                            }
                            long var_index9 = 0;
                            for (Object config : var_collectionvar2_list_coerced$) {
                                {
                                    boolean var_traversal11 = (((var_index9 >= 0) && (var_index9 <= var_end7)) && true);
                                    if (var_traversal11) {
                                        out.write("\n            <coral-masonry-item>\n                <coral-card colorhint=\"#ffffff\" assetwidth=\"242\" assetheight=\"242\">\n                    <coral-card-asset>\n                        <img src=\"/apps/frame-io-assets-console/content/cloudservice/thumb.png\"/>\n                    </coral-card-asset>\n                    <coral-card-content>\n                        <div>\n                            <h4>");
                                        {
                                            Object var_12 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(config, "title"), "text");
                                            out.write(renderContext.getObjectModel().toString(var_12));
                                        }
                                        out.write("</h4>\n                        </div>\n                        <div>\n                            <p>");
                                        {
                                            Object var_13 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(config, "configPath"), "text");
                                            out.write(renderContext.getObjectModel().toString(var_13));
                                        }
                                        out.write("</p>\n                        </div>\n                    </coral-card-content>\n                </coral-card>\n                <coral-quickactions target=\"_prev\" alignMy=\"left top\" alignAt=\"left top\">\n                    <coral-quickactions-item icon=\"edit\" class=\"foundation-anchor\"");
                                        {
                                            String var_attrcontent14 = ("/libs/wcm/core/content/sites/properties.html?item=" + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(config, "itemPath"), "attribute")));
                                            out.write(" data-foundation-anchor-href=\"");
                                            out.write(renderContext.getObjectModel().toString(var_attrcontent14));
                                            out.write("\"");
                                        }
                                        out.write(">");
                                        {
                                            Object var_15 = renderContext.call("xss", renderContext.call("i18n", "Edit Cloud Configuration", obj().with("i18n", null)), "text");
                                            out.write(renderContext.getObjectModel().toString(var_15));
                                        }
                                        out.write("</coral-quickactions-item>\n                    <coral-quickactions-item icon=\"delete\" class=\"foundation-collection-action\"");
                                        {
                                            String var_attrcontent16 = (("{\"action\": \"frameio.clientlib.delete\", \"data\": {\"path\": \"" + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(config, "itemPath"), "attribute"))) + "\"}}");
                                            out.write(" data-foundation-collection-action='");
                                            out.write(renderContext.getObjectModel().toString(var_attrcontent16));
                                            out.write("'");
                                        }
                                        out.write(">");
                                        {
                                            Object var_17 = renderContext.call("xss", renderContext.call("i18n", "Delete", obj().with("i18n", null)), "text");
                                            out.write(renderContext.getObjectModel().toString(var_17));
                                        }
                                        out.write("</coral-quickactions-item>\n                </coral-quickactions>\n            </coral-masonry-item>\n        ");
                                    }
                                }
                                var_index9++;
                            }
                            out.write("</coral-masonry>");
                        }
                    }
                }
            }
        }
    }
    var_collectionvar2_list_coerced$ = null;
}
out.write("\n    </section>\n");


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------



//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

