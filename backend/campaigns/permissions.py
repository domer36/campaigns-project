from rest_framework.permissions import BasePermission

class IsSuperAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'DELETE':
            return request.user.role == 'SUPERADMIN'
        return request.user.is_authenticated

class IsOwnerOrSuperAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user or request.user.role == 'SUPERADMIN'
