import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { withAuth } from "@/lib/auth";
import { taskApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import Layout from "@/components/layout/Layout";
import TaskCard from "@/components/task/TaskCard";
import TaskFilter from "@/components/task/TaskFilter";
import { PlusCircle } from "lucide-react";
import { Task } from "@shared/schema";

function Dashboard() {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState({
    priority: "all",
    dueDate: "all",
    sortBy: "dueDate",
    search: "",
    page: 1,
    limit: 5,
  });
  
  // Fetch tasks with filters
  const { 
    data, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ["/api/tasks", filters],
    queryFn: () => taskApi.getTasks(filters),
  });
  
  // Reset page when filters change
  useEffect(() => {
    if (filters.page !== 1 && (filters.priority !== "all" || filters.dueDate !== "all" || filters.search)) {
      setFilters({ ...filters, page: 1 });
    }
  }, [filters.priority, filters.dueDate, filters.search]);
  
  // Filter change handler
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  // Search handler for the header
  const handleSearch = (query: string) => {
    setFilters({ ...filters, search: query, page: 1 });
  };
  
  // Pagination handlers
  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo(0, 0);
  };
  
  // Calculate pagination
  const totalPages = data?.pagination ? Math.ceil(data.pagination.total / data.pagination.limit) : 0;
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const currentPage = filters.page;
    
    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );
    
    // First page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink 
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= totalPages - 1 && i >= 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Last page if there's more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );
    
    return items;
  };
  
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Tasks Dashboard</h1>
            <Button
              onClick={() => setLocation("/tasks/create")}
              className="inline-flex items-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> New Task
            </Button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Filters */}
          <div className="mt-4">
            <TaskFilter 
              onFilterChange={handleFilterChange} 
              defaultValues={{
                priority: filters.priority,
                dueDate: filters.dueDate,
                sortBy: filters.sortBy,
              }}
            />
          </div>
          
          {/* Task List */}
          <div className="mt-6">
            {isLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                <p className="mt-2 text-gray-500">Loading tasks...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-10">
                <p className="text-red-500">Error loading tasks. Please try again.</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </div>
            ) : data?.tasks?.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                  <PlusCircle className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filters.priority !== "all" || filters.dueDate !== "all" || filters.search
                    ? "Try adjusting your filters or search to find more tasks."
                    : "Get started by creating your first task."}
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setLocation("/tasks/create")}
                    className="inline-flex items-center"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Task
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {data?.tasks.map((task: Task) => (
                  <TaskCard 
                    key={task._id} 
                    task={task} 
                    onDelete={() => refetch()}
                  />
                ))}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-5">
                    <Pagination>
                      <PaginationContent>
                        {renderPaginationItems()}
                      </PaginationContent>
                    </Pagination>
                    
                    <p className="text-center text-sm text-gray-700 mt-2">
                      Showing {(data.pagination.page - 1) * data.pagination.limit + 1} to{" "}
                      {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{" "}
                      {data.pagination.total} results
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Dashboard);
