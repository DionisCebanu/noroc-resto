import React from 'react';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Plus, Minus } from 'lucide-react';
    import { categoriesData as rawCategoriesData } from '@/data/menuData';

    const CourseSection = ({ course, menuItems, selectedItemsForCourse, onItemSelectionChange, onQuantityChange, t }) => {
      const getItemsForCourse = (courseType) => {
        const relevantCategoryIds = rawCategoriesData
            .filter(cat => cat.type === courseType)
            .map(cat => cat.id);
        return menuItems.filter(item => relevantCategoryIds.includes(item.categoryId));
      };

      const items = getItemsForCourse(course.id);

      return (
        <div className="border-b border-slate-700 pb-6 last:border-b-0">
          <Label className="text-xl font-semibold text-accent mb-3 block">
            {t(course.nameKey, course.defaultName)}
          </Label>
          <div className="space-y-3">
            {items.length > 0 ? (
              items.map(item => {
                const selectedItem = selectedItemsForCourse.find(i => i.id === item.id);
                const isChecked = !!selectedItem;
                const quantity = selectedItem ? selectedItem.quantity : 0;

                return (
                  <div key={item.id} className="p-3 bg-slate-700/50 rounded-md hover:bg-slate-600/70 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-grow">
                        <Checkbox
                          id={`${course.id}-${item.id}-checkbox`}
                          checked={isChecked}
                          onCheckedChange={(checked) => onItemSelectionChange(course.id, item, checked)}
                          className="mr-3 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label htmlFor={`${course.id}-${item.id}-checkbox`} className="flex-grow text-gray-300 cursor-pointer">
                          {item.name}
                        </Label>
                      </div>
                      <span className="text-sm text-primary font-medium ml-2">${item.price.toFixed(2)}</span>
                    </div>
                    {isChecked && (
                      <div className="flex items-center space-x-2 mt-2 pl-8">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary hover:bg-primary/10"
                          onClick={() => onQuantityChange(course.id, item.id, Math.max(1, quantity - 1))}
                        >
                          <Minus size={16} />
                        </Button>
                        <Input
                          type="number"
                          id={`${course.id}-${item.id}-quantity`}
                          value={quantity}
                          onChange={(e) => onQuantityChange(course.id, item.id, parseInt(e.target.value, 10))}
                          min="1"
                          className="w-16 h-8 text-center bg-slate-600 border-slate-500 text-gray-200 focus:ring-primary focus:border-primary"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary hover:bg-primary/10"
                          onClick={() => onQuantityChange(course.id, item.id, quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                        <Label htmlFor={`${course.id}-${item.id}-quantity`} className="text-xs text-gray-400">{t('quantityLabel', { defaultText: 'Qty.'})}</Label>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 italic">{t('menuConstructorNoItemsForCourse', { defaultText: "No items available for this course."})}</p>
            )}
          </div>
        </div>
      );
    };

    export default CourseSection;